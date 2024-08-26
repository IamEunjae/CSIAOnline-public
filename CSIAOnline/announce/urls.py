from django.urls import path
from announce import views

urlpatterns = [
    path("announce/", views.announce_view, name="announce"),
    # path("teacher_login/", views.teacher_login, name="teacher_login"),
    # Add other app1-related paths as needed
]
