import json
import csv

# Load the JSON data
with open('users.json', 'r') as f:
    data = json.load(f)

# Define the CSV headers based on the template
headers = [
    'profile', 'address', 'birthdate', 'gender', 'preferred_username',
    'updated_at', 'website', 'picture', 'phone_number', 'phone_number_verified',
    'zoneinfo', 'locale', 'email', 'email_verified', 'given_name',
    'family_name', 'middle_name', 'name', 'nickname', 'cognito:mfa_enabled',
    'cognito:username'
]

# Generate the CSV file
with open('users_template.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(headers)  # Write the header row

    for user in data['Users']:
        # Extract attributes
        email = next((attr['Value'] for attr in user['Attributes'] if attr['Name'] == 'email'), None)
        email_verified = next((attr['Value'] for attr in user['Attributes'] if attr['Name'] == 'email_verified'), None)
        phone_number = next((attr['Value'] for attr in user['Attributes'] if attr['Name'] == 'phone_number'), None)
        phone_number_verified = next((attr['Value'] for attr in user['Attributes'] if attr['Name'] == 'phone_number_verified'), None)
        username = user['Username']

        # Populate the row matching the template
        row = [
            '', '', '', '', '',  # profile, address, birthdate, gender, preferred_username
            user.get('UserLastModifiedDate', ''),  # updated_at
            '', '', phone_number, phone_number_verified,  # website, picture, phone_number, phone_number_verified
            '', '', email, email_verified,  # zoneinfo, locale, email, email_verified
            '', '', '', '', '', '',  # given_name, family_name, middle_name, name, nickname, cognito:mfa_enabled
            username  # cognito:username
        ]
        writer.writerow(row)

print("CSV file 'users_template.csv' has been created.")
