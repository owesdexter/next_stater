import React, { ReactElement, useState, useMemo } from 'react';

// Define interfaces
export interface ISpecialWorkHour {
  startDate: Date;
  hour: number;
  type: string;
  reason: string;
  file?: string;
}

export interface IOvertime extends ISpecialWorkHour{
}

export interface IDayoff extends ISpecialWorkHour{
}

export interface IGeneralWorkTime {
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

const defaultContextValue = {
  generalWorkTime: {
    startTime: new Date(),
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
