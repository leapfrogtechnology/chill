import logger from '../utils/logger';
import config from '../config/config';
import messages from '../common/messages';
import emailClient from '../utils/emailClient';
import { renderEmailTemplate } from '../utils/templateRenderer';

/**
 * Check if email notifications are enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  return config.notifications.email && config.notifications.email.enabled;
}

/**
 * Send email notification.
 *
 * @param {Object} params
 * @returns {Promise}
 */
export async function notify(params) {
  if (!isEnabled()) {
    return Promise.resolve();
  }

  try {
    logger.debug('Notification Params:', params);
    let payload = preparePayLoad(params);

    let result = await sendNotification(payload);

    logger.info('Sent notification to email.');
    logger.debug('Result:', result);
  } catch (err) {
    logger.error('Error sending notification to email.', err);
  }
}

/**
 * Create and return payload required for email.
 *
 * @param {Object} params
 * @returns {Object}
 */
function preparePayLoad(params) {
  const { status, name, downtime } = params;
  const { receivers, sender } = config.notifications.email.message;

  const subject = `Status for ${name}`;

  let message = Object.assign({}, messages[status]);

  message.text = message.text(name, downtime);
  const emailBody = renderEmailTemplate('status', message);

  return {
    to: receivers,
    from: sender,
    subject: subject,
    html: emailBody
  };
}

/**
 * Send email notification
 *
 * @param {Object} payload
 * @returns {Promise}
 */
function sendNotification(payload) {
  return emailClient.sendMail(payload);
}