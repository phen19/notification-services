import { Body, Controller, Post } from '@nestjs/common';
import SendNotification from '../../../../src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dto/create-notification-body';
import { NotificationViewModel } from '../view-model/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    console.log(body);
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
