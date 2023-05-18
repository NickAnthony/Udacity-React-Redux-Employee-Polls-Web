import datetime
import json
import os
import unittest
from flask import abort, jsonify, request
from flask_sqlalchemy import SQLAlchemy

from api import create_app
from models import setup_db, User, Question, Answer, db
from test_data import existingQuestions, existingUsers


class EmployeePollsTestCase(unittest.TestCase):
    """This class represents the Employee Polls test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "employee_polls_test"
        self.database_path = "postgresql://localhost:5432/{}".format(self.database_name)
        setup_db(self.app, self.database_path, insert_initial_data=False)
        self.insertInitialData()

    def tearDown(self):
        """Executed after each test"""
        all_answers = Answer.query.all()
        for answer in all_answers:
            answer.delete()
        all_questions = Question.query.all()
        for question in all_questions:
            question.delete()
        all_users = User.query.all()
        for user in all_users:
            user.delete()
        pass

    def insertInitialData(self):
        for id, user in existingUsers.items():
            new_user = User(id, user["password"], user["name"], user["avatar_url"])
            new_user.insert()
        for id, question in existingQuestions.items():
            new_question = Question(
                question["optionOne"]["text"],
                question["optionTwo"]["text"],
                id,
                question["timestamp"],
            )
            author = db.session.get(User, question["author"])
            new_question.author = author
            new_question.insert()
            for user_id in question["optionOne"]["votes"]:
                user = db.session.get(User, user_id)
                newAnswer = Answer(1)
                newAnswer.question = new_question
                newAnswer.user = user
                newAnswer.insert()
            for user_id in question["optionTwo"]["votes"]:
                user = db.session.get(User, user_id)
                newAnswer = Answer(2)
                newAnswer.question = new_question
                newAnswer.user = user
                newAnswer.insert()

    # ------------------------------------------------------------
    # Testing '/users' GET endpoint
    # ------------------------------------------------------------
    def test_basic_get_users_succeeds(self):
        res = self.client().get("/users")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["users"])

        for id, user in data["users"].items():
            existingUser = existingUsers[id]
            self.assertEqual(existingUser["answers"], user["answers"])
            self.assertEqual(existingUser["avatar_url"], user["avatarURL"])
            self.assertEqual(existingUser["name"], user["name"])
            self.assertEqual(existingUser["questions"], user["questions"])

    # ------------------------------------------------------------
    # Testing '/users' POST endpoint
    # ------------------------------------------------------------
    def test_add_new_user_succeeds(self):
        # Create new user to ensure we don't collide with
        # existing answer.
        user_id = "ronning_up_that_hill"
        res = self.client().post(
            "/users",
            json={
                "username": user_id,
                "password": "scabbers",
                "name": "Ron Weasley",
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["id"], user_id)

    # ------------------------------------------------------------
    # Testing '/users' PATCH endpoint
    # ------------------------------------------------------------
    def test_update_user_succeeds(self):
        # Create new user to ensure we don't collide with
        # existing answer.
        user_id = "brainblast"
        res = self.client().post(
            "/users",
            json={
                "username": user_id,
                "password": "spark334",
                "name": "James Neutron",
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["id"], user_id)

        new_name = "Jimmy Neutron"
        new_avatar_url = "https://upload.wikimedia.org/wikipedia/en/7/76/Jimmy_Neutron_Boy_Genius_film.jpg"
        res = self.client().patch(
            "/users",
            json={
                "username": user_id,
                "name": new_name,
                "avatar_url": new_avatar_url,
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)

        res = self.client().get("/users")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["users"])

        for id, user in data["users"].items():
            if id == user_id:
                self.assertEqual(user["name"], new_name)
                self.assertEqual(user["avatarURL"], new_avatar_url)

    def test_update_user_password_succeeds(self):
        # Create new user to ensure we don't collide with
        # existing answer.
        user_id = "roadrunning"
        old_password = "beepbeep"
        new_password = "beepbeepbeep"
        res = self.client().post(
            "/users",
            json={
                "username": user_id,
                "password": old_password,
                "name": "Road Runner",
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["id"], user_id)

        res = self.client().patch(
            "/users",
            json={
                "username": user_id,
                "old_password": old_password,
                "new_password": new_password,
            },
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)

    def test_update_user_throws_401_for_bad_password(self):
        # Create new user to ensure we don't collide with
        # existing answer.
        user_id = "bugsbunny"
        old_password = "carrots"
        new_password = "whatsupdoc"
        res = self.client().post(
            "/users",
            json={
                "username": user_id,
                "password": old_password,
                "name": "Bugs Bunny",
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["id"], user_id)

        res = self.client().patch(
            "/users",
            json={
                "username": user_id,
                "old_password": "badpassword",
                "new_password": new_password,
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "Incorrect password")

    def test_update_user_throws_400_for_wrong_arguments(self):
        # Create new user to ensure we don't collide with
        # existing answer.
        user_id = "wileecoyote"
        old_password = "roadrunner"
        new_password = "dynamite"
        res = self.client().post(
            "/users",
            json={
                "username": user_id,
                "password": old_password,
                "name": "Wile E Coyote",
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["id"], user_id)

        res = self.client().patch(
            "/users",
            json={
                "username": user_id,
                "old_password": old_password,
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "Bad request")

        res = self.client().patch(
            "/users",
            json={
                "username": user_id,
                "new_password": new_password,
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(data["success"], False)
        self.assertEqual(data["message"], "Bad request")

    # ------------------------------------------------------------
    # Testing '/login' POST endpoint
    # ------------------------------------------------------------
    def test_basic_login_works(self):
        # Create new user to ensure we don't collide with
        # existing answer.
        user_id = "batman"
        password = "batmobile"
        res = self.client().post(
            "/users",
            json={
                "username": user_id,
                "password": password,
                "name": "Batman",
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["id"], user_id)

        res = self.client().post(
            "/login",
            json={
                "username": user_id,
                "password": password,
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])

    def test_basic_impersonate_login_works(self):
        res = self.client().post(
            "/login",
            json={
                "username": "sarahedo",
                "impersonate": True,
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])

    def test_invalid_impersonate_throws_401(self):
        # Create new user to ensure we don't collide with
        # existing answer.
        user_id = "brucewayne"
        password = "alfredisawesome"
        res = self.client().post(
            "/users",
            json={
                "username": user_id,
                "password": password,
                "name": "Bruce Wayne",
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["id"], user_id)

        res = self.client().post(
            "/login",
            json={
                "username": "brucewayne",
                "impersonate": True,
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertFalse(data["success"])

    # ------------------------------------------------------------
    # Testing '/questions' GET endpoint
    # ------------------------------------------------------------
    def test_basic_get_questions_succeeds(self):
        res = self.client().get("/questions")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["questions"])

        for id, user in data["questions"].items():
            existingQuestion = existingQuestions[id]
            self.assertEqual(existingQuestion["author"], user["author"])
            self.assertEqual(existingQuestion["timestamp"], user["timestamp"])
            self.assertEqual(
                existingQuestion["optionOne"]["text"], user["optionOne"]["text"]
            )
            self.assertEqual(
                existingQuestion["optionTwo"]["text"], user["optionTwo"]["text"]
            )

    # ------------------------------------------------------------
    # Testing '/questions' POST endpoint
    # ------------------------------------------------------------
    def test_add_new_question_succeeds(self):
        res = self.client().get("/users")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        # Get a random user id
        for id, _ in data["users"].items():
            author_id = id

        optionOne = "Testing option one"
        optionTwo = "Testing option two"

        res = self.client().post(
            "/questions",
            json={
                "username": author_id,
                "optionOne": optionOne,
                "optionTwo": optionTwo,
            },
        )
        data = json.loads(res.data)
        new_question_id = data["question"]["id"]

        # Assert the new question was inserted
        res = self.client().get("/questions")
        data = json.loads(res.data)
        question_exists = False
        for id, question in data["questions"].items():
            if id == new_question_id:
                question_exists = True
                self.assertEqual(question["id"], new_question_id)
                self.assertEqual(question["author"], author_id)
                self.assertEqual(question["optionOne"]["text"], optionOne)
                self.assertEqual(question["optionTwo"]["text"], optionTwo)
        self.assertTrue(question_exists)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        self.assertTrue(data["questions"])

    # ------------------------------------------------------------
    # Testing '/answers' POST endpoint
    # ------------------------------------------------------------
    def test_add_new_answer_succeeds(self):
        # Create new user to ensure we don't collide with
        # existing answer.

        user_id = "the_chosen_one"
        res = self.client().post(
            "/users",
            json={
                "username": user_id,
                "password": "hedwig",
                "name": "Harry Potter",
            },
        )
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)

        res = self.client().get("/questions")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        # Get a random question id
        for id, _ in data["questions"].items():
            question_id = id

        res = self.client().post(
            "/answers",
            json={
                "vote": 2,
                "username": user_id,
                "question_id": question_id,
            },
        )

        # Assert the new answer was inserted
        res = self.client().get("/questions")
        data = json.loads(res.data)
        for id, question in data["questions"].items():
            if id == question_id:
                self.assertTrue(user_id in question["optionTwo"]["votes"])
        res = self.client().get("/users")
        data = json.loads(res.data)
        for id, user in data["users"].items():
            if id == user_id:
                self.assertTrue(user["answers"][question_id] == "optionTwo")


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
