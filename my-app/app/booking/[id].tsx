import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Image as ImageIcon,
  CreditCard,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import { MOCK_COIFFEURS, MOCK_TIME_SLOTS, WEEK_DAYS } from "../../lib/mockData";
import { Service } from "../../lib/types";

type Step = "date" | "payment" | "confirmation";

type PaymentMethod = "visa" | "paypal" | "apple_pay";

const WEEKS = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
];

export default function BookingScreen() {
  const { id, services: servicesParam } = useLocalSearchParams<{
    id: string;
    services: string;
  }>();
  const router = useRouter();
  const coiffeur = MOCK_COIFFEURS.find((c) => c.id === id);

  const services: Service[] = servicesParam ? JSON.parse(servicesParam) : [];

  const [step, setStep] = useState<Step>("date");
  const [selectedDay, setSelectedDay] = useState<number>(18);
  const [selectedTime, setSelectedTime] = useState<string | null>("18h00");
  const [hairPhotoAdded, setHairPhotoAdded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("visa");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Payment form
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [savePayment, setSavePayment] = useState(false);

  const total = services.reduce((sum, s) => sum + s.priceEur, 0);

  if (!coiffeur) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-afro-gray">Coiffeur introuvable</Text>
      </View>
    );
  }

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setShowConfirmation(false);
    router.push("/");
  };

  return (
    <View className="flex-1">
      {/* Back bar */}
      <View className="flex-row items-center px-6 py-4 bg-white border-b border-afro-border">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-2">
          <ArrowLeft size={20} color="#1A1A1A" />
          <Text className="text-afro-black text-sm font-medium">Retour</Text>
        </TouchableOpacity>
      </View>

      {/* Coiffeur name */}
      <View className="px-8 pt-6 pb-2">
        <Text className="text-2xl font-bold text-afro-black">{coiffeur.name}</Text>
        <Text className="text-afro-gray text-sm">{coiffeur.location}</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 32, gap: 24 }}>

        {step === "date" && (
          <DateStep
            services={services}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            hairPhotoAdded={hairPhotoAdded}
            setHairPhotoAdded={setHairPhotoAdded}
            total={total}
            onNext={() => setStep("payment")}
            onBack={() => router.back()}
          />
        )}

        {step === "payment" && (
          <PaymentStep
            services={services}
            selectedDay={selectedDay}
            selectedTime={selectedTime}
            hairPhotoAdded={hairPhotoAdded}
            total={total}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            cardName={cardName}
            setCardName={setCardName}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expMonth={expMonth}
            setExpMonth={setExpMonth}
            expYear={expYear}
            setExpYear={setExpYear}
            cvc={cvc}
            setCvc={setCvc}
            savePayment={savePayment}
            setSavePayment={setSavePayment}
            onBack={() => setStep("date")}
            onConfirm={handleConfirm}
          />
        )}
      </ScrollView>

      {/* Confirmation modal */}
      <Modal visible={showConfirmation} transparent animationType="fade">
        <View className="flex-1 bg-black/40 items-center justify-center px-8">
          <View className="bg-white rounded-3xl p-10 items-center gap-5 w-full max-w-sm">
            <View className="w-16 h-16 bg-afro-light-gray rounded-full items-center justify-center">
              <CheckCircle size={40} color="#1A1A1A" />
            </View>
            <Text className="text-xl font-bold text-afro-black text-center">Votre réservation</Text>
            <Text className="text-afro-gray text-sm text-center leading-5">
              Votre réservation à bien été prise en compte. Vous recevrez un message et un mail de confirmation.
            </Text>
            <TouchableOpacity
              className="bg-afro-black px-8 py-3 rounded-full mt-2"
              onPress={handleClose}
            >
              <Text className="text-white font-medium">Retour à l'accueil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ─── Date Step ───────────────────────────────────────────────────────────────

interface DateStepProps {
  services: Service[];
  selectedDay: number;
  setSelectedDay: (d: number) => void;
  selectedTime: string | null;
  setSelectedTime: (t: string | null) => void;
  hairPhotoAdded: boolean;
  setHairPhotoAdded: (v: boolean) => void;
  total: number;
  onNext: () => void;
  onBack: () => void;
}

function DateStep({
  services,
  selectedDay,
  setSelectedDay,
  selectedTime,
  setSelectedTime,
  hairPhotoAdded,
  setHairPhotoAdded,
  total,
  onNext,
  onBack,
}: DateStepProps) {
  return (
    <View className="gap-6">
      <Text className="text-xl font-bold text-afro-black">Prestations</Text>

      {/* Services summary */}
      <View className="bg-white rounded-2xl border border-afro-border p-5 gap-3">
        {services.map((s) => (
          <View key={s.id} className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <CreditCard size={14} color="#6B6B6B" />
              <Text className="text-afro-dark text-sm">{s.name}</Text>
            </View>
            <Text className="text-afro-gray text-sm">{s.priceEur},00€</Text>
          </View>
        ))}
        <View className="flex-row items-center justify-between pt-2 border-t border-afro-border">
          <Text className="text-afro-black font-semibold text-sm">Total</Text>
          <Text className="text-afro-black font-bold text-sm">{total},00€</Text>
        </View>
      </View>

      <Text className="text-lg font-bold text-afro-black">Choisissez votre date</Text>

      {/* Photo de cheveux */}
      <TouchableOpacity
        className={`flex-row items-center gap-3 border rounded-xl px-4 py-3 ${
          hairPhotoAdded ? "border-afro-black bg-afro-light-gray" : "border-afro-border bg-white"
        }`}
        onPress={() => setHairPhotoAdded(!hairPhotoAdded)}
      >
        <ImageIcon size={18} color="#6B6B6B" />
        <Text className="text-afro-dark text-sm flex-1">
          Ajouter une photo de vos cheveux (optionnel)
        </Text>
        {hairPhotoAdded && (
          <Text className="text-afro-gray text-xs">1 photo ajouté</Text>
        )}
      </TouchableOpacity>

      {/* Calendar */}
      <View className="bg-white rounded-2xl border border-afro-border p-5 gap-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity>
            <ChevronLeft size={20} color="#1A1A1A" />
          </TouchableOpacity>
          <Text className="text-afro-black font-semibold">Janvier 2024</Text>
          <TouchableOpacity>
            <ChevronRight size={20} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Days header */}
        <View className="flex-row">
          {WEEK_DAYS.map((d) => (
            <View key={d} className="flex-1 items-center">
              <Text className="text-afro-gray text-xs font-medium">{d}</Text>
            </View>
          ))}
        </View>

        {/* Dates */}
        {WEEKS.map((week, wi) => (
          <View key={wi} className="flex-row">
            {week.map((day) => (
              <TouchableOpacity
                key={day}
                className="flex-1 items-center py-1"
                onPress={() => setSelectedDay(day)}
              >
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    selectedDay === day ? "bg-afro-black" : ""
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      selectedDay === day
                        ? "text-white font-bold"
                        : "text-afro-dark"
                    }`}
                  >
                    {day}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Time slots */}
      <View className="gap-3">
        <Text className="text-afro-black font-semibold text-sm">Horaires disponibles</Text>
        <View className="flex-row flex-wrap gap-2">
          {MOCK_TIME_SLOTS.map((slot) => (
            <TouchableOpacity
              key={slot.time}
              disabled={!slot.available}
              onPress={() => setSelectedTime(slot.time)}
              className={`px-4 py-2 rounded-full border ${
                !slot.available
                  ? "bg-afro-light-gray border-afro-border opacity-40"
                  : selectedTime === slot.time
                  ? "bg-afro-black border-afro-black"
                  : "bg-white border-afro-border"
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  selectedTime === slot.time ? "text-white" : "text-afro-dark"
                }`}
              >
                {slot.time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Navigation */}
      <View className="flex-row items-center justify-between mt-4">
        <TouchableOpacity
          className="border border-afro-border px-6 py-3 rounded-full"
          onPress={onBack}
        >
          <Text className="text-afro-dark text-sm">Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-6 py-3 rounded-full ${selectedTime ? "bg-afro-black" : "bg-afro-border"}`}
          onPress={onNext}
          disabled={!selectedTime}
        >
          <Text className="text-white text-sm font-medium">Choisir l'heure</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Payment Step ─────────────────────────────────────────────────────────────

interface PaymentStepProps {
  services: Service[];
  selectedDay: number;
  selectedTime: string | null;
  hairPhotoAdded: boolean;
  total: number;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (m: PaymentMethod) => void;
  cardName: string;
  setCardName: (v: string) => void;
  cardNumber: string;
  setCardNumber: (v: string) => void;
  expMonth: string;
  setExpMonth: (v: string) => void;
  expYear: string;
  setExpYear: (v: string) => void;
  cvc: string;
  setCvc: (v: string) => void;
  savePayment: boolean;
  setSavePayment: (v: boolean) => void;
  onBack: () => void;
  onConfirm: () => void;
}

function PaymentStep({
  services,
  selectedDay,
  selectedTime,
  hairPhotoAdded,
  total,
  paymentMethod,
  setPaymentMethod,
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  expMonth,
  setExpMonth,
  expYear,
  setExpYear,
  cvc,
  setCvc,
  savePayment,
  setSavePayment,
  onBack,
  onConfirm,
}: PaymentStepProps) {
  return (
    <View className="gap-6">
      <Text className="text-xl font-bold text-afro-black">Prestations</Text>

      {/* Cart summary */}
      <View className="bg-white rounded-2xl border border-afro-border p-6 gap-3">
        <Text className="text-afro-gray text-sm font-medium mb-1">Votre panier</Text>
        {services.map((s) => (
          <View key={s.id} className="gap-1">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <CreditCard size={14} color="#6B6B6B" />
                <Text className="text-afro-dark text-sm">{s.name}</Text>
              </View>
              <Text className="text-afro-gray text-sm">{s.priceEur},00€</Text>
            </View>
            <View className="flex-row items-center gap-2 pl-5">
              <Clock size={12} color="#6B6B6B" />
              <Text className="text-afro-gray text-xs">{s.durationMinutes}min</Text>
            </View>
          </View>
        ))}
        <View className="flex-row items-center gap-2">
          <Calendar size={14} color="#6B6B6B" />
          <Text className="text-afro-dark text-sm">Jeudi {selectedDay} Janvier</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Calendar size={14} color="#6B6B6B" />
          <Text className="text-afro-dark text-sm">{selectedTime}–21h00</Text>
        </View>
        {hairPhotoAdded && (
          <View className="flex-row items-center gap-2">
            <ImageIcon size={14} color="#6B6B6B" />
            <Text className="text-afro-dark text-sm">1 photo ajouté</Text>
          </View>
        )}
        <View className="flex-row items-center justify-between pt-3 border-t border-afro-border">
          <View className="flex-row items-center gap-2">
            <CreditCard size={14} color="#6B6B6B" />
            <Text className="text-afro-black font-semibold text-sm">Total</Text>
          </View>
          <Text className="text-afro-black font-bold text-sm">{total},00€</Text>
        </View>
      </View>

      {/* Payment methods */}
      <View className="gap-4">
        <View className="flex-row justify-center gap-8">
          {(["paypal", "visa", "apple_pay"] as PaymentMethod[]).map((method) => (
            <TouchableOpacity
              key={method}
              onPress={() => setPaymentMethod(method)}
              className="items-center gap-2"
            >
              <View className="px-4 py-3 bg-white border border-afro-border rounded-xl min-w-20 items-center">
                <Text className="text-afro-black font-bold text-sm">
                  {method === "paypal" ? "PayPal" : method === "visa" ? "VISA" : "Pay"}
                </Text>
              </View>
              <View
                className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === method
                    ? "border-afro-black bg-afro-black"
                    : "border-afro-border"
                }`}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Card form */}
        <View className="gap-4">
          <View className="flex-row gap-4">
            <View className="flex-1 gap-1">
              <Text className="text-afro-dark text-xs font-medium">Nom du propriétaire de la carte *</Text>
              <TextInput
                value={cardName}
                onChangeText={setCardName}
                className="border border-afro-border rounded-xl px-4 py-3 text-afro-black text-sm bg-white"
                placeholder=""
              />
            </View>
            <View className="flex-1 gap-1">
              <Text className="text-afro-dark text-xs font-medium">Numéro de carte *</Text>
              <TextInput
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={19}
                className="border border-afro-border rounded-xl px-4 py-3 text-afro-black text-sm bg-white"
                placeholder=""
              />
            </View>
          </View>

          <View className="flex-row gap-4">
            <View className="flex-1 gap-1">
              <Text className="text-afro-dark text-xs font-medium">Expiration *</Text>
              <View className="flex-row gap-2">
                <TextInput
                  value={expMonth}
                  onChangeText={setExpMonth}
                  placeholder="MM"
                  maxLength={2}
                  keyboardType="numeric"
                  className="flex-1 border border-afro-border rounded-xl px-4 py-3 text-afro-black text-sm bg-white"
                />
                <TextInput
                  value={expYear}
                  onChangeText={setExpYear}
                  placeholder="AA"
                  maxLength={2}
                  keyboardType="numeric"
                  className="flex-1 border border-afro-border rounded-xl px-4 py-3 text-afro-black text-sm bg-white"
                />
              </View>
            </View>
            <View className="flex-1 gap-1">
              <Text className="text-afro-dark text-xs font-medium">CVC *</Text>
              <TextInput
                value={cvc}
                onChangeText={setCvc}
                maxLength={4}
                keyboardType="numeric"
                className="border border-afro-border rounded-xl px-4 py-3 text-afro-black text-sm bg-white"
                placeholder=""
              />
            </View>
          </View>

          <TouchableOpacity
            className="flex-row items-center gap-2"
            onPress={() => setSavePayment(!savePayment)}
          >
            <View
              className={`w-4 h-4 rounded-full border-2 ${
                savePayment ? "border-afro-black bg-afro-black" : "border-afro-border"
              }`}
            />
            <Text className="text-afro-gray text-xs">
              Sauvegarder mon moyen de payement pour les prochaines fois
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation */}
      <View className="flex-row items-center justify-between mt-4">
        <TouchableOpacity
          className="border border-afro-border px-6 py-3 rounded-full"
          onPress={onBack}
        >
          <Text className="text-afro-dark text-sm">Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-afro-black px-6 py-3 rounded-full"
          onPress={onConfirm}
        >
          <Text className="text-white text-sm font-medium">Confirmer {total},00€</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
