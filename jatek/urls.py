from django.urls import path
from . import views

urlpatterns = [
    path('', views.questions),
    path('answer/', views.answer_question),
    path('new/', views.create_quiz),
    path('new/<int:diff>/', views.create_quiz_by_diff)
]
