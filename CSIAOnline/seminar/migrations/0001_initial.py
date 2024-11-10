# Generated by Django 5.0.1 on 2024-11-10 01:21

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Reservation",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("student1", models.CharField(blank=True, max_length=20)),
                ("student2", models.CharField(blank=True, max_length=20)),
                ("student3", models.CharField(blank=True, max_length=20)),
                ("student4", models.CharField(blank=True, max_length=20)),
                ("student5", models.CharField(blank=True, max_length=20)),
                ("student6", models.CharField(blank=True, max_length=20)),
                ("period1", models.BooleanField(default=False)),
                ("period2", models.BooleanField(default=False)),
                ("period3", models.BooleanField(default=False)),
                ("room_number", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="Room",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("room_number", models.IntegerField()),
                ("period1", models.BooleanField(default=False)),
                ("period2", models.BooleanField(default=False)),
                ("period3", models.BooleanField(default=False)),
            ],
        ),
    ]