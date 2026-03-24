from django.db import models


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