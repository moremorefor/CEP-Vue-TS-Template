import { CSInterface } from 'csinterface-ts'

declare global {
  interface Window {
    __adobe_cep__: CSInterface
  }
}
