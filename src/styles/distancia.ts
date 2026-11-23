import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {
    padding: 20,
    gap: 16,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  cabecera: {
    gap: 4,
  },
  antetitulo: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitulo: {
    fontSize: 14,
  },
  tarjeta: {
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  etiqueta: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  entrada: {
    fontSize: 34,
    fontWeight: '600',
    padding: 0,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  botonUnidad: {
    flex: 1,
    borderRadius: 12,
    padding: 10,
    gap: 2,
    minHeight: 64,
    justifyContent: 'center',
  },
  etiquetaBoton: {
    fontSize: 10,
    fontWeight: '700',
  },
  nombreUnidad: {
    fontSize: 13,
    fontWeight: '600',
  },
  simboloUnidad: {
    fontSize: 12,
  },
  botonIntercambiar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconoIntercambiar: {
    fontSize: 20,
    fontWeight: '600',
  },
  tarjetaResultado: {
    backgroundColor: '#2563EB',
    borderRadius: 18,
    padding: 18,
    gap: 6,
  },
  etiquetaResultado: {
    color: '#DBEAFE',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  valorResultado: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
  },
  unidadResultado: {
    color: '#DBEAFE',
    fontSize: 14,
  },
  separador: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 8,
  },
  formula: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  tarjetaInfo: {
    borderRadius: 14,
    padding: 16,
    gap: 6,
  },
  tituloInfo: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  elementoInfo: {
    fontSize: 13,
    lineHeight: 18,
  },
  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  cajaModal: {
    borderRadius: 20,
    padding: 18,
    gap: 8,
    maxHeight: '80%',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  tituloModal: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  opcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  nombreOpcion: {
    fontSize: 15,
    fontWeight: '600',
  },
  descOpcion: {
    fontSize: 12,
    marginTop: 2,
  },
  tilde: {
    color: '#2563EB',
    fontSize: 18,
    fontWeight: '700',
  },
});
