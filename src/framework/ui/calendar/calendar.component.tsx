import React from 'react';
import {
  BaseCalendarComponent,
  BaseCalendarProps,
} from './baseCalendar.component';
import {
  styled,
  StyledComponentProps,
} from '@kitten/theme';
import { CalendarDateInfo } from './type';
import { CalendarPickerCellProps } from './components/picker/calendarPickerCell.component';
import { DateBatch } from './service/calendarData.service';

export interface ComponentProps<D> {
  date?: D;
  onSelect: (date: D) => void;
}

export type CalendarProps<D> = ComponentProps<D> & BaseCalendarProps<D> & StyledComponentProps;
export type CalendarElement<D> = React.ReactElement<CalendarProps<D>>;

/**
 * Styled `Calendar` component.
 * Supports locales and different date objects like Moment.js or date-fns.
 * Composes date picker components in a horizontal pageable list.
 *
 * @extends React.Component
 *
 * @property {D} min - Minimal date that is able to be selected.
 *
 * @property {D} max - Maximum date that is able to be selected.
 *
 * @property {D} date - Date which is currently selected.
 *
 * @property {DateService<D>} dateService - Date service that is able to work with a date objects.
 * Defaults to Native Date service that works with JS Date.
 * Allows using different types of date like Moment.js or date-fns.
 *
 * @property {boolean} boundingMonth - Defines if we should render previous and next months in the current month view.
 *
 * @property {CalendarViewMode} startView - Defines starting view for calendar. Defaults to Date view.
 *
 * @property {(date: D) => string} title - Defines the title for visible date.
 *
 * @property {(date: D) => string} todayTitle - Defines the title for today's date.
 *
 * @property {(date: D) => ReactElement<any>} filter - Predicate that decides which cells will be disabled.
 *
 * @property {(date: D) => void} onSelect - Selection emitter. Fires when another day cell is pressed.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderDay - Should return the content of day cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderMonth - Should return the content of month cell.
 *
 * @property {(date: D, style: StyleType) => ReactElement<any>} renderYear - Should return the content of year cell.
 *
 * @overview-example Basic Usage
 *
 * ```
 * import React from 'react';
 * import { Calendar } from 'react-native-ui-kitten';
 *
 * export class BasicCalendar extends React.Component {
 *
 *   state = {
 *     date: new Date(),
 *   };
 *
 *   onSelect = (date) => {
 *     this.setState({ date });
 *   };
 *
 *   render() {
 *     return (
 *       <Calendar
 *         date={this.state.date}
 *         onSelect={this.onSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example Custom Day Cell
 *
 * ```
 * import React from 'react';
 * import { View, StyleSheet } from 'react-native';
 * import { Calendar, Text } from 'react-native-ui-kitten';
 *
 * export const DayCell = ({ date }, style) => (
 *   <View
 *     style={[styles.container, style.container]}>
 *     <Text style={style.text}>{`${date.getDate()}`}</Text>
 *     <Text style={[style.text, styles.value]}>
 *       {`${100 * date.getDate() + Math.pow(date.getDate(), 2)}$`}
 *     </Text>
 *   </View>
 * );
 *
 * const styles = StyleSheet.create({
 *   container: { flex: 1, justifyContent: 'center', alignItems: 'center', aspectRatio: 1 },
 *   value: { fontSize: 12, fontWeight: '400' },
 * });
 *
 * export class DailyValueCalendar extends React.Component {
 *
 *   state = {
 *     date: new Date(),
 *   };
 *
 *   onSelect = (date) => {
 *     this.setState({ date });
 *   };
 *
 *   render() {
 *     return (
 *       <Calendar
 *         date={this.state.date}
 *         onSelect={this.onSelect}
 *         renderDay={DayCell}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example Custom Locale
 *
 * ```
 * import React from 'react';
 * import { Calendar, NativeDateService } from 'react-native-ui-kitten';
 *
 * const i18n = {
 *   dayNames: {
 *     short: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
 *     long: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
 *   },
 *   monthNames: {
 *     short: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
 *     long: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
 *   },
 * };
 *
 * export class ChineseCalendar extends React.Component {
 *
 *   dateService = new NativeDateService('zh', i18n);
 *
 *   state = {
 *     date: new Date(),
 *   };
 *
 *   onSelect = (date) => {
 *     this.setState({ date });
 *   };
 *
 *   render() {
 *     return (
 *       <Calendar
 *         date={this.state.date}
 *         dateService={this.dateService}
 *         onSelect={this.onSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example Working with Moment
 *
 * ```
 * // IMPORTANT: To use Moment make sure to install Moment Date Service
 * // npm i @ui-kitten/moment
 *
 * import React from 'react';
 * import moment from 'moment';
 * import { Calendar } from 'react-native-ui-kitten';
 * import { MomentDateService } from '@ui-kitten/moment';
 *
 * export class MomentCalendar extends React.Component {
 *
 *   state = {
 *     date: moment();
 *   };
 *
 *   dateService = new MomentDateService();
 *
 *   onSelect = (date) => {
 *     this.setState({ date });
 *   }
 *
 *   render() {
 *     return (
 *       <Calendar
 *         date={this.state.date}
 *         dateService={this.dateService}
 *         onSelect={this.onSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 */
export class CalendarComponent<D> extends BaseCalendarComponent<D, CalendarProps<D>> {

  static styledComponentName: string = 'Calendar';

  // BaseCalendarComponent

  public onDaySelect(date: CalendarDateInfo<D>): void {
    const { onSelect } = this.props;

    if (onSelect) {
      onSelect(date.date);
    }
  }

  public getDayPickerData(date: CalendarDateInfo<D>): DateBatch<D> {
    return this.dataService.createDayPickerData(date.date);
  }

  public getSelectedDate(): D {
    return this.props.date || this.dateService.today();
  }

  public isDaySelected(date: CalendarDateInfo<D>): boolean {
    return this.dateService.isSameDaySafe(date.date, this.getSelectedDate());
  }

  public shouldUpdateDayElement(props: CalendarPickerCellProps<D>,
                                nextProps: CalendarPickerCellProps<D>): boolean {

    const dateChanged: boolean = this.dateService.compareDatesSafe(props.date.date, nextProps.date.date) !== 0;

    if (dateChanged) {
      return true;
    }

    const selectionChanged: boolean = props.selected !== nextProps.selected;
    const disablingChanged: boolean = props.disabled !== nextProps.disabled;

    const value: boolean = selectionChanged || disablingChanged;

    if (value) {
      return true;
    }

    return props.theme !== nextProps.theme;
  }
}

export const Calendar = styled(CalendarComponent);
