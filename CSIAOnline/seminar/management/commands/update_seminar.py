# seminar/management/commands/updateSeminar.py

from django.core.management.base import BaseCommand
from seminar.models import Reservation
import requests
import json


class Command(BaseCommand):
    help = "Update Google Sheets with seminar room reservations."

    def handle(self, *args, **kwargs):
        # Retrieve reservation data
        reservations = Reservation.objects.all()

        # Prepare data in the desired format
        reservation_data = []
        for reservation in reservations:
            reservation_entry = {
                "room_number": reservation.room_number,  # Use the room_number as-is
                "student1": reservation.student1,
                "student2": reservation.student2,
                "student3": reservation.student3,
                "student4": reservation.student4,
                "student5": reservation.student5,
                "student6": reservation.student6,
                "period1": reservation.period1,
                "period2": reservation.period2,
                "period3": reservation.period3,
            }
            reservation_data.append(reservation_entry)
        print(reservation_data)

        # Send data to Google Sheets API endpoint via Apps Script Web App URL
        web_app_url = "https://script.google.com/macros/s/AKfycbzjoegmShNj9uKy8SbmqCeFvS3qVNeM80uolLIqBpowEg8BpIxrZyFSv9EghKp0SVs/exec"
        response = requests.post(
            web_app_url, data=json.dumps({"reservations": reservation_data})
        )

        if response.status_code == 200:
            self.stdout.write(self.style.SUCCESS("Google Sheets updated successfully"))
        else:
            self.stdout.write(self.style.ERROR("Failed to update Google Sheets"))
