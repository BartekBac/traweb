# Generated by Django 3.1.3 on 2021-01-28 22:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_opinion'),
    ]

    operations = [
        migrations.RenameField(
            model_name='opinion',
            old_name='isPositive',
            new_name='is_positive',
        ),
    ]