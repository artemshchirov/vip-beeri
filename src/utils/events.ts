import { logEvent } from 'firebase/analytics';

import { analytics } from '../firebase';

// TODO
logEvent(analytics, 'button_click', { buttonId: 'add_row_button' });

// TODO
export const selectDropdownEvent = (name: string, formName: string, formDate: string, formNote: string) => {
  logEvent(analytics, 'select_name', {
    name,
    userAgent: window.navigator.userAgent,
    time: Date(),
    formData: [{ formName, formDate, formNote }],
  });
};
