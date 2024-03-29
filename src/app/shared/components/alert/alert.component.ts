import { Component, Input, OnInit } from '@angular/core';
import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() timeout = 3000;
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {
    this.alertService.getAlert().subscribe((alert) => {
      if (!alert) {
        this.alerts = [];
        return;
      }
      this.alerts.push(alert);
      setTimeout(() => {
        this.removeAlert(alert);
      }, this.timeout);
    });
  }

  ngOnInit(): void {}

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter((alertFromList) => {
      return alertFromList !== alert;
    });
  }

  getAlertClass(alert: Alert) {
    if (!alert) {
      return;
    }
    switch (alert.alertType) {
      case AlertType.SUCCESS:
        return 'alert alert-success';
      case AlertType.DANGER:
        return 'alert alert-danger';
      case AlertType.INFO:
        return 'alert alert-info';
      case AlertType.WARNING:
        return 'alert alert-warning';
    }
  }
}
