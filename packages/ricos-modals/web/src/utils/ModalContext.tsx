import React from 'react';
import { RicosModalService } from '../ModalService';
import type { ModalContextValue } from '../types';

const modalService = new RicosModalService();
export const ModalContext = React.createContext<ModalContextValue>({ modalService });
