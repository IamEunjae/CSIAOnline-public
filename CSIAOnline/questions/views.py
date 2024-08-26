from django.shortcuts import render
from django.http import HttpResponseRedirect


# Create your views here.
def questions_view(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect("https://csiatech.kr/")

    return render(request, "questions.html")
