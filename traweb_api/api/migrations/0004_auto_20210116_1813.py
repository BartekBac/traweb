# Generated by Django 3.1.3 on 2021-01-16 17:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210113_2355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='travelposition',
            name='travel',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='positions', to='api.travel'),
        ),
    ]
