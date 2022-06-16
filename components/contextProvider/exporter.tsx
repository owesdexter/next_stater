import React, { ReactElement, useState, useMemo } from 'react';

// Define interfaces
export interface ISpecialWorkHour {
  startDate: Date;
  hour: number;
  reason: string;
  file?: string;
}

export interface IOvertime extends ISpecialWorkHour{
  awardType: string
}

export interface IDayoff extends ISpecialWorkHour{
  dayoffType: string
}

export interface IGeneralWorkTime {
  targetMonth: number,
  startTime: Date;
  sd: number,
}

export interface IExporterContext {
  generalWorkTime: IGeneralWorkTime;
  overtime?: IOvertime[];
  dayoff?: IDayoff[];
  setGeneralWorkTime?: React.Dispatch<React.SetStateAction<IGeneralWorkTime>>;
  setOvertime?: React.Dispatch<React.SetStateAction<IOvertime[]>>;
  setDayoff?: React.Dispatch<React.SetStateAction<IDayoff[]>>;
}

const defaultContextValue:IExporterContext = {
  generalWorkTime: {
    targetMonth: new Date().getMonth()+1,
    startTime: (()=> {
      const now = new Date();
      now.setHours(9);
      now.setMinutes(0);
      return now}
    )(),
    sd: 5,
  },
}

export const ExporterContext = React.createContext<IExporterContext>(defaultContextValue);


// Build Component context provider
export default function ExportContextProvider({children}: any){
  const [generalWorkTime, setGeneralWorkTime] = useState<IGeneralWorkTime>(defaultContextValue.generalWorkTime);
  const [overtime, setOvertime] = useState<IOvertime[]>([]);
  const [dayoff, setDayoff] = useState<IDayoff[]>([]);

  const contextValue = useMemo<IExporterContext>(
    () => ({
      generalWorkTime,
      overtime,
      dayoff,
      setGeneralWorkTime,
      setOvertime,
      setDayoff
    }),
    [
      generalWorkTime,
      overtime,
      dayoff,
      setGeneralWorkTime,
      setOvertime,
      setDayoff
    ],
  );

  return(
    <ExporterContext.Provider value={contextValue}>
      {children}
    </ExporterContext.Provider>
  )
}
