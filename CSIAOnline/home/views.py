from django.shortcuts import render
from django.http import HttpResponseRedirect


def home_view(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect("/")
    # Your logic to aggregate data or render templates goes here
    print(request.user.student_id)
    return render(request, "home.html")
