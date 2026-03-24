from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Question
from .serializers import QuestionSerializer

@api_view(["GET"])
def questions(request):
    questions = Question.objects.all()
    serialized = QuestionSerializer(questions, many = True)
    return Response(serialized.data)