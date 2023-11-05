import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.interakt.ai/v1/public/message',
  headers: {
    Authorization: `Basic ${process.env.NEXT_PUBLIC_WHATSAPP_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const ClientAddWhatsappMessage = async ({
  phone,
  name,
  brand,
  executiveName,
  executivePhone,
  executiveEmail,
}: {
  phone: string;
  name: string;
  brand: string;
  executiveName: string;
  executivePhone: string;
  executiveEmail: string;
}) => {
  const data = await axiosInstance.post('/', {
    countryCode: '+91',
    phoneNumber: phone,
    callbackData: 'some text here',
    type: 'Template',
    template: {
      name: 'client_add_7v',
      languageCode: 'en',
      bodyValues: [name, brand, executiveName, executivePhone, executiveEmail],
    },
  });

  return data;
};

export const DeliverableBookingWhatsappMessage = async ({
  phone,
  name,
  brand,
  deliverable,
}: {
  phone: string;
  name: string;
  brand: string;
  deliverable: string;
}) => {
  const data = await axiosInstance.post('/', {
    countryCode: '+91',
    phoneNumber: phone,
    callbackData: 'some text here',
    type: 'Template',
    template: {
      name: 'deliverable_booking_fv',
      languageCode: 'en',
      bodyValues: [name, brand, deliverable, brand],
    },
  });

  return data;
};

export const DeliverableSchedulingWhatsappMessage = async ({
  phone,
  name,
  deliverable,
  quantity,
  dateTime,
  executive,
}: {
  phone: string;
  name: string;
  deliverable: string;
  quantity: string;
  dateTime: string;
  executive: string;
}) => {
  const data = await axiosInstance.post('/', {
    countryCode: '+91',
    phoneNumber: phone,
    callbackData: 'some text here',
    type: 'Template',
    template: {
      name: 'deliverable_scheduling_dt',
      languageCode: 'en',
      bodyValues: [name, deliverable, quantity, dateTime, executive],
    },
  });

  return data;
};

export const DeliverablePostingWhatsappMessage = async ({
  phone,
  name,
  deliverable,
  quantity,
  link,
  executive,
}: {
  phone: string;
  name: string;
  deliverable: string;
  quantity: string;
  link: string;
  executive: string;
}) => {
  const data = await axiosInstance.post('/', {
    countryCode: '+91',
    phoneNumber: phone,
    callbackData: 'some text here',
    type: 'Template',
    template: {
      name: 'deliverable_posting_97',
      languageCode: 'en',
      bodyValues: [name, deliverable, quantity, link, executive],
    },
  });

  return data;
};

export const ReportPostingWhatsappMessage = async ({
  phone,
  name,
  deliverable,
  quantity,
  brand,
  executive,
  link,
}: {
  phone: string;
  name: string;
  deliverable: string;
  quantity: string;
  brand: string;
  executive: string;
  link: string;
}) => {
  const data = await axiosInstance.post('/', {
    countryCode: '+91',
    phoneNumber: phone,
    callbackData: 'some text here',
    type: 'Template',
    template: {
      name: 'report_posting_a3',
      languageCode: 'en',
      headerValues: [link],
      bodyValues: [name, deliverable, quantity, brand, executive],
    },
  });

  return data;
};
