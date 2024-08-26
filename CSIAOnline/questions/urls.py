from django.urls import path
from . import views

urlpatterns = [
    path("questions/", views.questions_view, name="questions"),
    # path("teacher_login/", views.teacher_login, name="teacher_login"),
    # Add other app1-related paths as needed
]
