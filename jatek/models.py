from django.db import models
from django.contrib.auth.models import User
import uuid

class Question(models.Model):
    DIFFICULTY_CHOICES = [
        (1, "Könnyű"),
        (2, "Közepes"),
        (3, "Nehéz"),
    ]

    text = models.TextField()
    
    answer_a = models.CharField(max_length=255)
    answer_b = models.CharField(max_length=255)
    answer_c = models.CharField(max_length=255)
    answer_d = models.CharField(max_length=255)

    image = models.ImageField(upload_to="images/", null=True, blank=True)

    correct_answer = models.CharField(
        max_length=1,
        choices=[("A", "A"), ("B", "B"), ("C", "C"), ("D", "D")]
    )

    difficulty = models.IntegerField(
        choices=DIFFICULTY_CHOICES,
        default=1
    )

    def __str__(self):
        return f"{self.text} (szint: {self.get_difficulty_display()})"

class Quiz(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="quizzes"
    )

    questions = models.ManyToManyField(
        Question,
        related_name="quizzes"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )
    
    is_active = models.BooleanField(default=True)
    result = models.IntegerField(default=0)

    def __str__(self):
        return f"Quiz {self.id} - {self.user.username}"

class UserAnswer(models.Model):
    ANSWER_CHOICES = [("A", "A"), ("B", "B"), ("C", "C"), ("D", "D")]

    quiz = models.ForeignKey(
        "Quiz",
        on_delete=models.CASCADE,
        related_name="user_answers"
    )

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE
    )

    selected_answer = models.CharField(
        max_length=1,
        choices=ANSWER_CHOICES
    )
    class Meta:
        unique_together = ("quiz", "question")

    def __str__(self):
        return f"{self.quiz.id} - {self.question.id} - {self.selected_answer}"