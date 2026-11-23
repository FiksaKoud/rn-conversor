import { useTheme } from '@/hooks/use-theme';
import { estilos } from '@/styles/masa';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Medidas de masa y peso y su factor de conversión a gramos (g)
const UNIDADES = [
  { nombre: 'Miligramo', simbolo: 'mg', factor: 0.001, descripcion: '0,001 g' },
  { nombre: 'Gramo', simbolo: 'g', factor: 1, descripcion: 'Unidad base' },
  { nombre: 'Onza (ounce)', simbolo: 'oz', factor: 28.3495, descripcion: 'Aprox. 28,35 gramos' },
  { nombre: 'Libra (pound)', simbolo: 'lb', factor: 453.592, descripcion: '16 onzas (~453,59 g)' },
  { nombre: 'Kilogramo', simbolo: 'kg', factor: 1000, descripcion: '1.000 gramos' },
  { nombre: 'Arroba', simbolo: '@', factor: 11502.3, descripcion: '25 libras (~11,5 kg)' },
  { nombre: 'Quintal métrico', simbolo: 'q', factor: 100000, descripcion: '100 kg' },
  { nombre: 'Tonelada métrica', simbolo: 't', factor: 1000000, descripcion: '1.000 kg' },
  { nombre: 'Tonelada corta (US)', simbolo: 'ton', factor: 907184.74, descripcion: '2.000 libras (~907,18 kg)' },
];

export default function PantallaMasa() {
  const tema = useTheme();
  const [cantidad, setCantidad] = useState('1');
  const [origen, setOrigen] = useState(UNIDADES[4]); // Kilogramo por defecto
  const [destino, setDestino] = useState(UNIDADES[3]); // Libra por defecto
  const [seleccionando, setSeleccionando] = useState(null);

  const cantidadNumerica = parseFloat(cantidad.replace(',', '.')) || 0;
  const resultado = (cantidadNumerica * origen.factor) / destino.factor;

  const formatearNumero = (numero) =>
    new Intl.NumberFormat('es-ES', { maximumSignificantDigits: 7 }).format(numero);

  const intercambiar = () => {
    setOrigen(destino);
    setDestino(origen);
  };

  const seleccionarUnidad = (unidad) => {
    if (seleccionando === 'origen') {
      setOrigen(unidad);
    } else {
      setDestino(unidad);
    }
    setSeleccionando(null);
  };

  return (
    <SafeAreaView style={[estilos.contenedor, { backgroundColor: tema.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
        {/* Cabecera */}
        <View style={estilos.cabecera}>
          <Text style={estilos.antetitulo}>CONVERSOR</Text>
          <Text style={[estilos.titulo, { color: tema.text }]}>Masa y peso</Text>
          <Text style={[estilos.subtitulo, { color: tema.textSecondary }]}>
            Gramos, libras, onzas, kilos y más
          </Text>
        </View>

        {/* Entrada y Unidades */}
        <View style={[estilos.tarjeta, { backgroundColor: tema.backgroundElement }]}>
          <Text style={[estilos.etiqueta, { color: tema.textSecondary }]}>CANTIDAD</Text>
          <TextInput
            keyboardType="decimal-pad"
            onChangeText={(valor) => /^\d*([.,]\d*)?$/.test(valor) && setCantidad(valor)}
            placeholder="0"
            placeholderTextColor={tema.textSecondary}
            style={[estilos.entrada, { color: tema.text }]}
            value={cantidad}
          />

          <View style={estilos.fila}>
            <Pressable
              onPress={() => setSeleccionando('origen')}
              style={[estilos.botonUnidad, { backgroundColor: tema.background }]}>
              <Text style={[estilos.etiquetaBoton, { color: tema.textSecondary }]}>DE</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={[estilos.nombreUnidad, { color: tema.text }]}>
                {origen.nombre}
              </Text>
              <Text style={[estilos.simboloUnidad, { color: tema.textSecondary }]}>{origen.simbolo} ⌄</Text>
            </Pressable>

            <Pressable onPress={intercambiar} style={[estilos.botonIntercambiar, { backgroundColor: tema.background }]}>
              <Text style={[estilos.iconoIntercambiar, { color: tema.text }]}>⇄</Text>
            </Pressable>

            <Pressable
              onPress={() => setSeleccionando('destino')}
              style={[estilos.botonUnidad, { backgroundColor: tema.background }]}>
              <Text style={[estilos.etiquetaBoton, { color: tema.textSecondary }]}>A</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={[estilos.nombreUnidad, { color: tema.text }]}>
                {destino.nombre}
              </Text>
              <Text style={[estilos.simboloUnidad, { color: tema.textSecondary }]}>{destino.simbolo} ⌄</Text>
            </Pressable>
          </View>
        </View>

        {/* Tarjeta de Resultado */}
        <View style={estilos.tarjetaResultado}>
          <Text style={estilos.etiquetaResultado}>RESULTADO</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={estilos.valorResultado}>
            {cantidad ? formatearNumero(resultado) : '—'}
          </Text>
          <Text style={estilos.unidadResultado}>{destino.nombre}</Text>
          <View style={estilos.separador} />
          <Text style={estilos.formula}>
            {cantidad
              ? `${formatearNumero(cantidadNumerica)} ${origen.simbolo} = ${formatearNumero(resultado)} ${destino.simbolo}`
              : 'Introduce una cantidad'}
          </Text>
        </View>

        {/* Equivalencias de referencia */}
        <View style={[estilos.tarjetaInfo, { backgroundColor: tema.backgroundElement }]}>
          <Text style={[estilos.tituloInfo, { color: tema.text }]}>Equivalencias</Text>
          {UNIDADES.map((u) => (
            <Text key={u.simbolo} style={[estilos.elementoInfo, { color: tema.textSecondary }]}>
              • {u.nombre}: {u.descripcion}
            </Text>
          ))}
        </View>
      </ScrollView>

      {/* Selector de unidad modal */}
      <Modal animationType="fade" onRequestClose={() => setSeleccionando(null)} transparent visible={seleccionando !== null}>
        <Pressable onPress={() => setSeleccionando(null)} style={estilos.fondoModal}>
          <Pressable onPress={(e) => e.stopPropagation()} style={[estilos.cajaModal, { backgroundColor: tema.background }]}>
            <Text style={[estilos.tituloModal, { color: tema.text }]}>
              {seleccionando === 'origen' ? 'Convertir desde:' : 'Convertir a:'}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {UNIDADES.map((unidad) => {
                const estaSeleccionada = (seleccionando === 'origen' ? origen.simbolo : destino.simbolo) === unidad.simbolo;
                return (
                  <Pressable
                    key={unidad.simbolo}
                    onPress={() => seleccionarUnidad(unidad)}
                    style={[
                      estilos.opcion,
                      { backgroundColor: estaSeleccionada ? tema.backgroundSelected : 'transparent' },
                    ]}>
                    <View>
                      <Text style={[estilos.nombreOpcion, { color: tema.text }]}>{unidad.nombre}</Text>
                      <Text style={[estilos.descOpcion, { color: tema.textSecondary }]}>
                        {unidad.simbolo} · {unidad.descripcion}
                      </Text>
                    </View>
                    {estaSeleccionada && <Text style={estilos.tilde}>✓</Text>}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
