import api from "./api";

export const messService = {
  getMenu(date) {
    return api.get("/menu", {
      params: date ? { date } : {},
    });
  },

  getFeedback() {
    return api.get("/feedback");
  },

  submitFeedback(payload) {
    return api.post("/feedback", payload);
  },

  getComplaints() {
    return api.get("/complaints");
  },

  submitComplaint(payload) {
    return api.post("/complaints", payload);
  },

  updateComplaintStatus(id, status) {
    return api.patch(`/complaints/${id}`, { status });
  },

  addMenuItem(payload) {
    return api.post("/menu", payload);
  },
};