# seminar/management/commands/clear_room.py

from django.core.management.base import BaseCommand
from seminar.models import Reservation, Room


class Command(BaseCommand):
    help = "Clears all reservations and resets room availability"

    def handle(self, *args, **kwargs):
        # Clear all reservations
        Reservation.objects.all().delete()

        # Reset all room periods to False
        Room.objects.update(period1=False, period2=False, period3=False)

        self.stdout.write(
            self.style.SUCCESS(
                "Successfully cleared all reservations and reset room availability"
            )
        )
