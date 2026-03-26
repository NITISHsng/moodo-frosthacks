import * as alertService from "../services/alert.service.js";

/**
 * GET /alerts
 * Get active alerts
 */
export const getAlerts = async (req, res, next) => {
  try {
    const alerts = await alertService.getActiveAlerts(req.user._id);

    res.status(200).json({ success: true, data: alerts });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /alerts/:id/acknowledge
 * Acknowledge an alert
 */
export const acknowledgeAlert = async (req, res, next) => {
  try {
    const { id } = req.params;

    const alert = await alertService.acknowledgeAlert(id);

    res.status(200).json({ success: true, data: alert });
  } catch (err) {
    next(err);
  }
};
