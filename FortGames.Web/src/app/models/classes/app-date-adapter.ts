import { NativeDateAdapter } from "@angular/material/core";

export class AppDateAdapter extends NativeDateAdapter {

  constructor(locale: string) {
    super(locale);
  }

  override getFirstDayOfWeek(): number {
    return 1;
  }
}
