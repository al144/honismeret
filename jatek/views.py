from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Question, Quiz, UserAnswer
from .serializers import QuestionSerializer
from rest_framework.permissions import IsAuthenticated
import random
from .helper import get_quiz_and_question, save_user_answer, finalize_quiz
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import GameSession, GameAnswer

@api_view(["GET"])
def questions(request):
    questions = Question.objects.all()
    serialized = QuestionSerializer(questions, many=True)
    return Response(serialized.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_game_result(request):
    data = request.data
    # Létrehozzuk a fő játékmenetet
    session = GameSession.objects.create(
        user=request.user,
        total_prize=data.get('total_prize', '0 Ft'),
        correct_count=data.get('correct_count', 0)
    )
    
    # Elmentjük a részletes válaszokat
    details = data.get('details', [])
    for item in details:
        GameAnswer.objects.create(
            session=session,
            question_text=item.get('question_text'),
            user_answer=item.get('user_answer'),
            correct_answer=item.get('correct_answer'),
            is_correct=item.get('is_correct')
        )
    
    return Response({"status": "success"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_game_history(request):
    # A legfrissebb játékok legyenek elöl
    sessions = GameSession.objects.filter(user=request.user).order_by('-date')
    history_data = []
    
    for s in sessions:
        ans_list = s.answers.all().values('question_text', 'user_answer', 'correct_answer', 'is_correct')
        history_data.append({
            "id": s.id,
            "date": s.date,
            "total_prize": s.total_prize,
            "correct_count": s.correct_count,
            "details": list(ans_list)
        })
    
    return Response(history_data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def answer_question(request):
    quiz_id = request.data.get("quiz_id")
    question_id = request.data.get("question_id")
    selected_answer = request.data.get("selected_answer")

    if not all([quiz_id, question_id, selected_answer]):
        return Response({"error": "Missing data, you need quiz_id:string, question_id:number, selected_answer:string"}, status=400)

    quiz, question, error = get_quiz_and_question(quiz_id, question_id, request.user)
    if error:
        return error

    user_answer, created = save_user_answer(quiz, question, selected_answer)

    if selected_answer != question.correct_answer:
        correct_count = finalize_quiz(quiz)
        return Response({
            "message": "Wrong answer! Quiz is now finished.",
            "quiz_active": quiz.is_active,
            "result": correct_count,
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
    if diff == 0:
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
    return create_quiz_by_diff(request, 0)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def create_millionaire_quiz(request):
    """15 kérdés növekvő nehézségben: 5 könnyű, 5 közepes, 5 nehéz"""
    
    questions = []
    
    easy = list(Question.objects.filter(difficulty=1))
    if len(easy) < 5:
        return Response({
            "error": f"Nincs elég könnyű kérdés. Van {len(easy)} db, de 5 kell."
        }, status=400)
    questions.extend(random.sample(easy, 5))
    
    medium = list(Question.objects.filter(difficulty=2))
    if len(medium) < 5:
        return Response({
            "error": f"Nincs elég közepes kérdés. Van {len(medium)} db, de 5 kell."
        }, status=400)
    questions.extend(random.sample(medium, 5))
    
    hard = list(Question.objects.filter(difficulty=3))
    if len(hard) < 5:
        return Response({
            "error": f"Nincs elég nehéz kérdés. Van {len(hard)} db, de 5 kell."
        }, status=400)
    questions.extend(random.sample(hard, 5))
    
    quiz = Quiz.objects.create(user=request.user)
    quiz.questions.set(questions)
    
    serialized = QuestionSerializer(questions, many=True)
    
    return Response({
        "quiz_id": quiz.id,
        "questions": serialized.data,
        "total_questions": 15,
        "difficulty_breakdown": {
            "easy": 5,
            "medium": 5,
            "hard": 5
        }
    })