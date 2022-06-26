import React, { ReactElement, useState, useMemo, useCallback } from 'react';

// Define interfaces
export interface ISpecialWorkTime {
  startDate: Date;
  hour: number;
  type: string;
  reason: string;
  file?: string;
}

export interface IOvertime extends ISpecialWorkTime{
}

export interface IDayoff extends ISpecialWorkTime{
  endtDate: Date;
}

export interface IGeneralWorkTime {
  targetMonth: number,
  startTime: Date;
  sd: number,
}

export interface IExporterContext {
  generalWorkTime: IGeneralWorkTime;
  overtime: IOvertime[];
  dayoff: IDayoff[];
  isProhibitedNext: boolean;
  // setGeneralWorkTime?: React.Dispatch<React.SetStateAction<IGeneralWorkTime>>;
  // setOvertime?: React.Dispatch<React.SetStateAction<IOvertime[]>>;
  // setDayoff?: React.Dispatch<React.SetStateAction<IDayoff[]>>;
  updateGeneralWorkTime: (value: IGeneralWorkTime)=>void;
  updateOvertime: (value: IOvertime[])=>void;
  updateDayoff: (value: IDayoff[])=>void;
  updateIsProhibitedNext: (value: boolean)=>void;
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
  overtime: [],
  dayoff: [],
  isProhibitedNext: false,

  updateGeneralWorkTime: (value: IGeneralWorkTime):void =>{
    throw new Error('You probably forgot to put <ExporterContextProvider>.');
  },
  updateOvertime: (value: IOvertime[])=>{
    throw new Error('You probably forgot to put <ExporterContextProvider>.');
  },
  updateDayoff: (value: IDayoff[])=>{
    throw new Error('You probably forgot to put <ExporterContextProvider>.');
  },
  updateIsProhibitedNext: (value: boolean)=>{
    throw new Error('You probably forgot to put <ExporterContextProvider>.');
  }
}

export const ExporterContext = React.createContext<IExporterContext>(defaultContextValue);


// Build Component context provider
export default function ExportContextProvider({children}: any){
  const [generalWorkTime, setGeneralWorkTime] = useState<IGeneralWorkTime>(defaultContextValue.generalWorkTime);
  const [overtime, setOvertime] = useState<IOvertime[]>([]);
  const [dayoff, setDayoff] = useState<IDayoff[]>([]);
  const [isProhibitedNext, setIsProhibitedNext] = useState<boolean>(false);

  const updateGeneralWorkTime = useCallback((value: IGeneralWorkTime)=>{
    setGeneralWorkTime(value);
  }, [setGeneralWorkTime]);

  const updateOvertime = useCallback((value: IOvertime[])=>{
    setOvertime(value);
  }, [setOvertime]);

  const updateDayoff = useCallback((value: IDayoff[])=>{
    setDayoff(value);
  }, [setDayoff]);

  const updateIsProhibitedNext = useCallback((value: boolean)=>{
    setIsProhibitedNext(value);
  }, [setIsProhibitedNext]);

  const contextValue = useMemo<IExporterContext>(
    () => ({
      generalWorkTime,
      overtime,
      dayoff,
      isProhibitedNext,
      updateGeneralWorkTime,
      updateOvertime,
      updateDayoff,
      updateIsProhibitedNext
    }),
    [
      generalWorkTime,
      overtime,
      dayoff,
      isProhibitedNext,
      updateGeneralWorkTime,
      updateOvertime,
      updateDayoff,
      updateIsProhibitedNext
    ],
  );

  return(
    <ExporterContext.Provider value={contextValue}>
      {children}
    </ExporterContext.Provider>
  )
}
