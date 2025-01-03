import { differenceInDays, parseISO, startOfToday } from 'date-fns';
import { Communication, CompanyWithCommunications } from '../types/communication';
import { Company } from '../types/company';
import { communicationMethodStorage } from './communicationMethodStorage';

export const getCommunicationStatus = (
  lastCommunicationDate: string,
  periodicity: number,
  highlightDisabled?: boolean
): 'overdue' | 'due' | 'normal' => {
  if (highlightDisabled) return 'normal';
  
  const today = startOfToday();
  const lastDate = parseISO(lastCommunicationDate);
  const daysSinceLastComm = differenceInDays(today, lastDate);
  
  if (daysSinceLastComm > periodicity) return 'overdue';
  if (daysSinceLastComm === periodicity) return 'due';
  return 'normal';
};

export const getNextCommunicationDate = (lastDate: string, periodicity: number): string => {
  const date = parseISO(lastDate);
  date.setDate(date.getDate() + periodicity);
  return date.toISOString();
};

export const enrichCompanyWithCommunications = (
  company: Company,
  communications: Communication[]
): CompanyWithCommunications => {
  const companyCommunications = communications
    .filter(comm => comm.companyId === company.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const lastCommunication = companyCommunications[0];
  const methods = communicationMethodStorage.getMethods();
  const nextMethod = methods[0]; // Use first method as default

  return {
    ...company,
    lastCommunications: companyCommunications.slice(0, 5),
    nextCommunication: lastCommunication ? {
      type: nextMethod.name,
      date: getNextCommunicationDate(lastCommunication.date, company.communicationPeriodicity)
    } : undefined,
    status: lastCommunication ? 
      getCommunicationStatus(lastCommunication.date, company.communicationPeriodicity) : 
      'overdue'
  };
};