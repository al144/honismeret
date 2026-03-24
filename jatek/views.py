from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Question, Quiz, UserAnswer
from .serializers import QuestionSerializer
from rest_framework.permissions import IsAuthenticated
import random

@api_view(["GET"])
def questions(request):
    questions = Question.objects.all()
    serialized = QuestionSerializer(questions, many = True)
    return Response(serialized.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def answer_question(request):
    quiz_id = request.data.get("quiz_id")
    question_id = request.data.get("question_id")
    selected_answer = request.data.get("selected_answer")

    if not all([quiz_id, question_id, selected_answer]):
        return Response({"error": "Missing data"}, status=400)

    try:
        quiz = Quiz.objects.get(id=quiz_id)
        question = Question.objects.get(id=question_id)
    except (Quiz.DoesNotExist, Question.DoesNotExist):
        return Response({"error": "Invalid quiz or question"}, status=404)

    if quiz.user != request.user:
        return Response({"error": "Unauthorized"}, status=403)

    if not quiz.questions.filter(id=question.id).exists():
        return Response({"error": "Question not part of this quiz"}, status=400)

    user_answer, created = UserAnswer.objects.update_or_create(
        quiz=quiz,
        question=question,
        defaults={"selected_answer": selected_answer}
    )

    if selected_answer != question.correct_answer:
        quiz.is_active = False
        quiz.save()
        return Response({
            "message": "Wrong answer! Quiz is now finished.",
            "quiz_active": quiz.is_active,
            "created": created
        })

    return Response({
        "message": "Answer saved. Correct!",
        "quiz_active": quiz.is_active,
        "created": created
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def create_quiz_by_diff(request, diff):
    num_questions = 2
    if(diff == 0):
        all_questions = list(Question.objects.all())
    else:
        all_questions = list(Question.objects.filter(difficulty=diff))

    if len(all_questions) < num_questions:
        return Response({"error": "Not enough questions"}, status=400)

    selected_questions = random.sample(all_questions, num_questions)

    quiz = Quiz.objects.create(user=request.user)

    quiz.questions.set(selected_questions)

    serialized_questions = QuestionSerializer(selected_questions, many=True)

    return Response({
        "quiz_id": quiz.id,
        "questions": serialized_questions.data
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def create_quiz(request):
    create_quiz_by_diff(request, 0)