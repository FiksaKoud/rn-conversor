import { useTheme } from '@/hooks/use-theme';
import { estilos } from '@/styles/distancia';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Medidas de distancia y su factor de conversión a metros
const UNIDADES = [
  { nombre: 'Milímetro', simbolo: 'mm', factor: 0.001, descripcion: '0,001 m' },
  { nombre: 'Centímetro', simbolo: 'cm', factor: 0.01, descripcion: '0,01 m' },
  { nombre: 'Pulgada (inch)', simbolo: 'in', factor: 0.0254, descripcion: 'Aprox. 2,54 cm' },
  { nombre: 'Pie (foot)', simbolo: 'ft', factor: 0.3048, descripcion: '12 pulgadas (~30,48 cm)' },
  { nombre: 'Yarda (yard)', simbolo: 'yd', factor: 0.9144, descripcion: '3 pies (~91,44 cm)' },
  { nombre: 'Metro', simbolo: 'm', factor: 1, descripcion: 'Unidad base SI' },
  { nombre: 'Kilómetro', simbolo: 'km', factor: 1000, descripcion: '1.000 m' },
  { nombre: 'Milla (mile)', simbolo: 'mi', factor: 1609.344, descripcion: '5.280 pies (~1,61 km)' },
  { nombre: 'Milla náutica', simbolo: 'nmi', factor: 1852, descripcion: '1.852 m' },
];

//type Unidad = (typeof UNIDADES)[number];

export default function PantallaDistancia() {
  const tema = useTheme();
  const [cantidad, setCantidad] = useState('1');
  const [origen, setOrigen] = useState(UNIDADES[0]);
  const [destino, setDestino] = useState(UNIDADES[1]);
  const [seleccionando, setSeleccionando] = useState(null);
  // const [origen, setOrigen] = useState<Unidad>(UNIDADES[0]);
  // const [destino, setDestino] = useState<Unidad>(UNIDADES[1]);
  // const [seleccionando, setSeleccionando] = useState<'origen' | 'destino' | null>(null);

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
          <Text style={[estilos.titulo, { color: tema.text }]}>Distancia</Text>
          <Text style={[estilos.subtitulo, { color: tema.textSecondary }]}>
            Métricas, imperiales y náuticas
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
