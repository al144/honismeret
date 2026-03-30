from django.urls import path
from . import views

urlpatterns = [
    path('', views.questions, name='questions'),
    path('answer/', views.answer_question, name='answer_question'),
    path('new/', views.create_quiz),
    path('new/<int:diff>/', views.create_quiz_by_diff),
    path('millionaire/', views.create_millionaire_quiz),
]
