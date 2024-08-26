from django.urls import path
from announce import views

urlpatterns = [
    path("club/", views.announce_view, name="club"),
    # path("teacher_login/", views.teacher_login, name="teacher_login"),
    # Add other app1-related paths as needed
]
