from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseRedirect
from django.db import transaction
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from datetime import datetime
from .models import (
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    DefaultMonday,
    DefaultTuesday,
    DefaultWednesday,
    DefaultThursday,
)
from .serializers import (
    MondaySerializer,
    TuesdaySerializer,
    WednesdaySerializer,
    ThursdaySerializer,
    DefaultMondaySerializer,
    DefaultTuesdaySerializer,
    DefaultWednesdaySerializer,
    DefaultThursdaySerializer,
)


def get_schedule_model_for_current_day(student_id):
    current_day = datetime.now().weekday()
    model = {0: Monday, 1: Tuesday, 2: Wednesday, 3: Thursday}.get(current_day, Monday)
    return model.objects.filter(student_id=student_id).first()


@transaction.atomic
def ensure_schedule_exists(student_id):
    for default_model, current_model in [
        (DefaultMonday, Monday),
        (DefaultTuesday, Tuesday),
        (DefaultWednesday, Wednesday),
        (DefaultThursday, Thursday),
    ]:
        if not current_model.objects.filter(student_id=student_id).exists():
            default_model.objects.get_or_create(
                student_id=student_id,
                defaults={"period1": "야자", "period2": "야자", "period3": "야자"},
            )
            current_model.objects.get_or_create(
                student_id=student_id,
                defaults={"period1": "야자", "period2": "야자", "period3": "야자"},
            )


@transaction.atomic
def update_schedule(model, student_id, data, serializer_class):
    instance = model.objects.select_for_update().filter(student_id=student_id).first()
    serializer = serializer_class(instance, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return None
    return serializer.errors


@csrf_exempt
@api_view(["GET", "PUT", "POST"])
def yaja_view(request):
    if not request.user.is_authenticated or "user_id" not in request.session:
        request.session.flush()
        return HttpResponseRedirect("https://csiatech.kr/")

    session_student_id = request.session.get("student_id")
    current_student_id = request.user.student_id
    if session_student_id != current_student_id:
        request.session.flush()
        return HttpResponseRedirect("https://csiatech.kr/")

    schedule = get_schedule_model_for_current_day(current_student_id)

    ensure_schedule_exists(current_student_id)

    if request.method == "PUT":
        data = json.loads(request.body)
        with transaction.atomic():
            errors = {}
            for day, model, serializer_class in [
                ("Monday", Monday, MondaySerializer),
                ("Tuesday", Tuesday, TuesdaySerializer),
                ("Wednesday", Wednesday, WednesdaySerializer),
                ("Thursday", Thursday, ThursdaySerializer),
            ]:
                if day_data := data.get(day):
                    if error := update_schedule(
                        model, current_student_id, day_data, serializer_class
                    ):
                        errors[day] = error

            if errors:
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            {"status": "success", "student_id": current_student_id},
            status=status.HTTP_200_OK,
        )

    if request.method == "POST":
        data = json.loads(request.body)
        with transaction.atomic():
            errors = {}
            for day, model, serializer_class in [
                ("Monday", DefaultMonday, DefaultMondaySerializer),
                ("Tuesday", DefaultTuesday, DefaultTuesdaySerializer),
                ("Wednesday", DefaultWednesday, DefaultWednesdaySerializer),
                ("Thursday", DefaultThursday, DefaultThursdaySerializer),
            ]:
                if day_data := data.get(day):
                    if error := update_schedule(
                        model, current_student_id, day_data, serializer_class
                    ):
                        errors[day] = error

            if errors:
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            {"status": "echo", "student_id": current_student_id},
            status=status.HTTP_200_OK,
        )

    if request.method == "GET":
        if request.headers.get("X-Schedule-Type") == "default":
            model_serializer_pairs = [
                (DefaultMonday, DefaultMondaySerializer),
                (DefaultTuesday, DefaultTuesdaySerializer),
                (DefaultWednesday, DefaultWednesdaySerializer),
                (DefaultThursday, DefaultThursdaySerializer),
            ]
        elif request.headers.get("X-Schedule-Type") == "current":
            model_serializer_pairs = [
                (Monday, MondaySerializer),
                (Tuesday, TuesdaySerializer),
                (Wednesday, WednesdaySerializer),
                (Thursday, ThursdaySerializer),
            ]

        response_data = {}
        for model, serializer_class in model_serializer_pairs:
            instance = model.objects.filter(student_id=current_student_id).first()
            serializer = serializer_class(instance)
            response_data[model.__name__.lower()] = serializer.data

        response_data["action"] = "retrieve"
        if request.headers.get("X-Schedule-Type") == "default":
            response_data["type"] = "default"

        return Response(response_data)

    return render(request, "yaja.html", {"Yaja": schedule})
