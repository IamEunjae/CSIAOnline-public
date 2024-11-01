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
                "room_number": reservation.room_number,
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
        
        payload = {"reservations": reservation_data}
        self.stdout.write(f"Sending payload: {json.dumps(payload, ensure_ascii=False, indent=2)}")

        # Send data to Google Sheets API endpoint
        web_app_url = "https://script.google.com/macros/s/AKfycbwe1QRjJ1TIrbW0ObiGdi9tExqu1oeRuOlfR5zD2ODvjqipx-rmcZkuRmTflsJBHNA/exec"
        
        try:
            response = requests.post(
                web_app_url,
                json=payload,  # Changed from data=json.dumps(payload)
                headers={'Content-Type': 'application/json'}
            )
            
            self.stdout.write(f"Response status code: {response.status_code}")
            self.stdout.write(f"Response content: {response.text}")
            
            if response.status_code == 200:
                self.stdout.write(self.style.SUCCESS("Google Sheets updated successfully"))
            else:
                self.stdout.write(self.style.ERROR(f"Failed to update Google Sheets: {response.text}"))
                
        except requests.exceptions.RequestException as e:
            self.stdout.write(self.style.ERROR(f"Request failed: {str(e)}"))