from .models import Quiz, Question, UserAnswer
from rest_framework.response import Response
from django.db import models

def get_quiz_and_question(quiz_id, question_id, user):
    try:
        quiz = Quiz.objects.get(id=quiz_id)
        question = Question.objects.get(id=question_id)
    except (Quiz.DoesNotExist, Question.DoesNotExist):
        return None, None, Response({"error": "Invalid quiz or question"}, status=404)

    if quiz.user != user:
        return None, None, Response({"error": "Unauthorized"}, status=403)

    if not quiz.questions.filter(id=question.id).exists():
        return None, None, Response({"error": "Question not part of this quiz"}, status=400)

    if not quiz.is_active:
        return None, None, Response({"error": "This quiz is inactive, you can't answer anymore."}, status=400)

    return quiz, question, None


def save_user_answer(quiz, question, selected_answer):
    return UserAnswer.objects.update_or_create(
        quiz=quiz,
        question=question,
        defaults={"selected_answer": selected_answer}
    )


def finalize_quiz(quiz):
    correct_count = UserAnswer.objects.filter(
        quiz=quiz,
        selected_answer=models.F('question__correct_answer')
    ).count()
    quiz.result = correct_count
    quiz.is_active = False
    quiz.save()
    return correct_count