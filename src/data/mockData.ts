import { format, subDays, addDays, addHours } from 'date-fns';

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brandName: string;
  strength: string;
  dose: string;
  frequency: string;
  instructions: string;
  doctor: string;
  startDate: string;
  endDate: string;
  color: string;
  icon: string;
  familyMemberId: string;
  inventory: {
    currentQuantity: number;
    totalQuantity: number;
    refillsRemaining: number;
    daysRemaining: number;
  };
  schedule: {
    times: string[];
    type: 'daily' | 'weekly' | 'monthly' | 'custom';
    days?: string[];
    relationToMeal?: 'before' | 'after' | 'any';
  };
}

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  photo: string;
  role: 'owner' | 'parent' | 'caregiver' | 'member';
  conditions: string[];
  allergies: string[];
  doctor: string;
  bloodType: string;
  avatar: string;
}

export interface DoseRecord {
  id: string;
  medicineId: string;
  medicineName: string;
  familyMemberId: string;
  scheduledTime: string;
  takenTime?: string;
  status: 'taken' | 'missed' | 'skipped' | 'upcoming' | 'overdue';
  confirmedBy?: string;
}

export interface Notification {
  id: string;
  type: 'due' | 'missed' | 'refill' | 'prescription' | 'family' | 'safety';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

export interface Prescription {
  id: string;
  imageUrl: string;
  date: string;
  doctor: string;
  medicines: {
    name: string;
    strength: string;
    confidence: number;
    added: boolean;
  }[];
  status: 'scanned' | 'confirmed' | 'added';
}

export interface HealthInsight {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  icon: string;
}

const today = new Date();

export const familyMembers: FamilyMember[] = [
  {
    id: 'fm1',
    name: 'Sarah Johnson',
    age: 34,
    photo: '',
    role: 'owner',
    conditions: ['Migraine'],
    allergies: ['Penicillin'],
    doctor: 'Dr. Emily Chen',
    bloodType: 'A+',
    avatar: '👩'
  },
  {
    id: 'fm2',
    name: 'Michael Johnson',
    age: 36,
    photo: '',
    role: 'parent',
    conditions: ['Hypertension'],
    allergies: ['Sulfa drugs'],
    doctor: 'Dr. Robert Williams',
    bloodType: 'O+',
    avatar: '👨'
  },
  {
    id: 'fm3',
    name: 'Eleanor Johnson',
    age: 72,
    photo: '',
    role: 'member',
    conditions: ['Diabetes Type 2', 'Hypertension', 'Osteoporosis'],
    allergies: ['Aspirin', 'Ibuprofen'],
    doctor: 'Dr. James Park',
    bloodType: 'B+',
    avatar: '👵'
  },
  {
    id: 'fm4',
    name: 'Lily Johnson',
    age: 8,
    photo: '',
    role: 'member',
    conditions: ['Asthma'],
    allergies: ['Peanuts', 'Dairy'],
    doctor: 'Dr. Maria Santos',
    bloodType: 'A+',
    avatar: '👧'
  }
];

export const medicines: Medicine[] = [
  {
    id: 'med1',
    name: 'Vitamin D3',
    genericName: 'Cholecalciferol',
    brandName: 'Nature Made',
    strength: '1000 IU',
    dose: '1 tablet',
    frequency: 'Once daily',
    instructions: 'Take with breakfast',
    doctor: 'Dr. Emily Chen',
    startDate: format(subDays(today, 90), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 275), 'yyyy-MM-dd'),
    color: '#FFB74D',
    icon: '☀️',
    familyMemberId: 'fm1',
    inventory: {
      currentQuantity: 45,
      totalQuantity: 90,
      refillsRemaining: 3,
      daysRemaining: 45
    },
    schedule: {
      times: ['08:00'],
      type: 'daily',
      relationToMeal: 'after'
    }
  },
  {
    id: 'med2',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    brandName: 'Zestril',
    strength: '10mg',
    dose: '1 tablet',
    frequency: 'Once daily',
    instructions: 'Take in the morning, with or without food',
    doctor: 'Dr. Robert Williams',
    startDate: format(subDays(today, 180), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 185), 'yyyy-MM-dd'),
    color: '#42A5F5',
    icon: '💙',
    familyMemberId: 'fm2',
    inventory: {
      currentQuantity: 12,
      totalQuantity: 30,
      refillsRemaining: 2,
      daysRemaining: 12
    },
    schedule: {
      times: ['07:00'],
      type: 'daily',
      relationToMeal: 'any'
    }
  },
  {
    id: 'med3',
    name: 'Metformin',
    genericName: 'Metformin HCl',
    brandName: 'Glucophage',
    strength: '500mg',
    dose: '1 tablet',
    frequency: 'Twice daily',
    instructions: 'Take with meals to reduce stomach upset',
    doctor: 'Dr. James Park',
    startDate: format(subDays(today, 365), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 365), 'yyyy-MM-dd'),
    color: '#AB47BC',
    icon: '💜',
    familyMemberId: 'fm3',
    inventory: {
      currentQuantity: 28,
      totalQuantity: 60,
      refillsRemaining: 4,
      daysRemaining: 14
    },
    schedule: {
      times: ['08:00', '20:00'],
      type: 'daily',
      relationToMeal: 'after'
    }
  },
  {
    id: 'med4',
    name: 'Albuterol Inhaler',
    genericName: 'Albuterol Sulfate',
    brandName: 'ProAir HFA',
    strength: '90mcg/actuation',
    dose: '2 puffs',
    frequency: 'As needed',
    instructions: 'Shake well before use. Wait 1 minute between puffs.',
    doctor: 'Dr. Maria Santos',
    startDate: format(subDays(today, 60), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 305), 'yyyy-MM-dd'),
    color: '#26A69A',
    icon: '💨',
    familyMemberId: 'fm4',
    inventory: {
      currentQuantity: 1,
      totalQuantity: 1,
      refillsRemaining: 1,
      daysRemaining: 30
    },
    schedule: {
      times: ['07:00', '19:00'],
      type: 'daily',
      relationToMeal: 'any'
    }
  },
  {
    id: 'med5',
    name: 'Alendronate',
    genericName: 'Alendronate Sodium',
    brandName: 'Fosamax',
    strength: '70mg',
    dose: '1 tablet',
    frequency: 'Once weekly',
    instructions: 'Take first thing in the morning with full glass of water. Stay upright for 30 minutes.',
    doctor: 'Dr. James Park',
    startDate: format(subDays(today, 120), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 245), 'yyyy-MM-dd'),
    color: '#EC407A',
    icon: '🦴',
    familyMemberId: 'fm3',
    inventory: {
      currentQuantity: 8,
      totalQuantity: 12,
      refillsRemaining: 5,
      daysRemaining: 56
    },
    schedule: {
      times: ['06:30'],
      type: 'weekly',
      days: ['Monday'],
      relationToMeal: 'before'
    }
  }
];

export const generateDoseHistory = (): DoseRecord[] => {
  const records: DoseRecord[] = [];
  let id = 1;

  medicines.forEach(med => {
    for (let day = 0; day < 30; day++) {
      const date = subDays(today, day);
      med.schedule.times.forEach(time => {
        const scheduledTime = format(date, 'yyyy-MM-dd') + 'T' + time + ':00';
        const isPast = day > 0 || new Date() > new Date(scheduledTime);
        const random = Math.random();

        let status: DoseRecord['status'];
        let takenTime: string | undefined;

        if (isPast) {
          if (random > 0.15) {
            status = 'taken';
            const offset = Math.floor(Math.random() * 30);
            takenTime = format(addHours(new Date(scheduledTime), offset / 60), "yyyy-MM-dd'T'HH:mm:ss");
          } else if (random > 0.05) {
            status = 'missed';
          } else {
            status = 'skipped';
          }
        } else {
          status = 'upcoming';
        }

        records.push({
          id: `dr${id++}`,
          medicineId: med.id,
          medicineName: med.name,
          familyMemberId: med.familyMemberId,
          scheduledTime,
          takenTime,
          status,
          confirmedBy: status === 'taken' ? med.familyMemberId : undefined
        });
      });
    }
  });

  return records.sort((a, b) => new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime());
};

export const doseHistory = generateDoseHistory();

export const todayDoses: DoseRecord[] = doseHistory.filter(d => {
  const doseDate = new Date(d.scheduledTime);
  return format(doseDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
});

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'due',
    title: 'Medicine Due Soon',
    message: 'Vitamin D3 is due in 15 minutes for Sarah.',
    time: format(today, "yyyy-MM-dd'T'HH:mm:ss"),
    read: false,
    icon: '⏰'
  },
  {
    id: 'n2',
    type: 'missed',
    title: 'Missed Dose Alert',
    message: 'Nana has not taken Metformin (morning dose) today.',
    time: format(subDays(today, 0), "yyyy-MM-dd'T'08:30:00"),
    read: false,
    icon: '🚨'
  },
  {
    id: 'n3',
    type: 'family',
    title: 'Family Activity',
    message: 'Dad completed his evening Lisinopril dose.',
    time: format(subDays(today, 0), "yyyy-MM-dd'T'19:05:00"),
    read: true,
    icon: '✅'
  },
  {
    id: 'n4',
    type: 'refill',
    title: 'Low Stock Warning',
    message: 'Lisinopril has only 12 tablets remaining. Refill soon!',
    time: format(subDays(today, 1), "yyyy-MM-dd'T'10:00:00"),
    read: false,
    icon: '📦'
  },
  {
    id: 'n5',
    type: 'prescription',
    title: 'Prescription Expiring',
    message: 'Metformin prescription expires in 30 days. Contact Dr. Park.',
    time: format(subDays(today, 2), "yyyy-MM-dd'T'09:00:00"),
    read: true,
    icon: '📋'
  },
  {
    id: 'n6',
    type: 'safety',
    title: 'Drug Interaction Alert',
    message: 'Potential interaction between Metformin and Alendronate noted.',
    time: format(subDays(today, 3), "yyyy-MM-dd'T'14:00:00"),
    read: true,
    icon: '⚠️'
  },
  {
    id: 'n7',
    type: 'due',
    title: 'Weekly Reminder',
    message: 'Alendronate is due tomorrow morning for Nana.',
    time: format(subDays(today, 3), "yyyy-MM-dd'T'20:00:00"),
    read: true,
    icon: '📅'
  },
  {
    id: 'n8',
    type: 'family',
    title: 'Profile Updated',
    message: 'Sarah updated Lily\'s allergy information.',
    time: format(subDays(today, 4), "yyyy-MM-dd'T'16:00:00"),
    read: true,
    icon: '👨‍👩‍👧'
  },
  {
    id: 'n9',
    type: 'refill',
    title: 'Refill Completed',
    message: 'Vitamin D3 refill has been processed. Pick up at CVS Pharmacy.',
    time: format(subDays(today, 5), "yyyy-MM-dd'T'11:00:00"),
    read: true,
    icon: '💊'
  },
  {
    id: 'n10',
    type: 'due',
    title: 'Streak Achievement!',
    message: '🎉 Sarah has a 30-day perfect adherence streak!',
    time: format(subDays(today, 5), "yyyy-MM-dd'T'08:00:00"),
    read: true,
    icon: '🏆'
  }
];

export const prescriptions: Prescription[] = [
  {
    id: 'rx1',
    imageUrl: '',
    date: format(subDays(today, 10), 'yyyy-MM-dd'),
    doctor: 'Dr. James Park',
    medicines: [
      { name: 'Metformin', strength: '500mg', confidence: 96, added: true },
      { name: 'Alendronate', strength: '70mg', confidence: 94, added: true },
      { name: 'Calcium + Vitamin D', strength: '600mg/400IU', confidence: 89, added: false }
    ],
    status: 'added'
  },
  {
    id: 'rx2',
    imageUrl: '',
    date: format(subDays(today, 30), 'yyyy-MM-dd'),
    doctor: 'Dr. Robert Williams',
    medicines: [
      { name: 'Lisinopril', strength: '10mg', confidence: 98, added: true },
      { name: 'Aspirin', strength: '81mg', confidence: 92, added: true }
    ],
    status: 'added'
  },
  {
    id: 'rx3',
    imageUrl: '',
    date: format(subDays(today, 5), 'yyyy-MM-dd'),
    doctor: 'Dr. Maria Santos',
    medicines: [
      { name: 'Albuterol Inhaler', strength: '90mcg', confidence: 97, added: true },
      { name: 'Fluticasone Nasal Spray', strength: '50mcg', confidence: 85, added: false }
    ],
    status: 'confirmed'
  }
];

export const healthInsights: HealthInsight[] = [
  {
    id: 'hi1',
    type: 'warning',
    message: 'Nana has not taken blood pressure medication today.',
    icon: '⚠️'
  },
  {
    id: 'hi2',
    type: 'success',
    message: 'Vitamin D completion rate is 92% this month.',
    icon: '📊'
  },
  {
    id: 'hi3',
    type: 'warning',
    message: 'Lisinopril stock may run out in 12 days.',
    icon: '📦'
  },
  {
    id: 'hi4',
    type: 'info',
    message: 'Family adherence rate improved by 5% this week.',
    icon: '📈'
  },
  {
    id: 'hi5',
    type: 'success',
    message: 'Sarah has maintained a 30-day perfect streak!',
    icon: '🏆'
  }
];

export const weeklyAdherence = [
  { day: 'Mon', adherence: 95, missed: 1 },
  { day: 'Tue', adherence: 100, missed: 0 },
  { day: 'Wed', adherence: 88, missed: 2 },
  { day: 'Thu', adherence: 92, missed: 1 },
  { day: 'Fri', adherence: 97, missed: 0 },
  { day: 'Sat', adherence: 85, missed: 3 },
  { day: 'Sun', adherence: 90, missed: 1 }
];

export const monthlyAdherence = [
  { week: 'Week 1', adherence: 91 },
  { week: 'Week 2', adherence: 94 },
  { week: 'Week 3', adherence: 88 },
  { week: 'Week 4', adherence: 93 }
];

export const medicineUsage = [
  { name: 'Vitamin D3', count: 30, color: '#FFB74D' },
  { name: 'Lisinopril', count: 30, color: '#42A5F5' },
  { name: 'Metformin', count: 58, color: '#AB47BC' },
  { name: 'Albuterol', count: 14, color: '#26A69A' },
  { name: 'Alendronate', count: 4, color: '#EC407A' }
];

export const refillHistory = [
  { id: 'rh1', medicine: 'Vitamin D3', date: format(subDays(today, 30), 'yyyy-MM-dd'), pharmacy: 'CVS Pharmacy', status: 'completed' },
  { id: 'rh2', medicine: 'Lisinopril', date: format(subDays(today, 15), 'yyyy-MM-dd'), pharmacy: 'Walgreens', status: 'completed' },
  { id: 'rh3', medicine: 'Metformin', date: format(subDays(today, 7), 'yyyy-MM-dd'), pharmacy: 'CVS Pharmacy', status: 'pending' },
  { id: 'rh4', medicine: 'Albuterol Inhaler', date: format(subDays(today, 45), 'yyyy-MM-dd'), pharmacy: 'Rite Aid', status: 'completed' },
];

export const emergencyContacts = [
  { id: 'ec1', name: 'Dr. Emily Chen', phone: '(555) 123-4567', relation: 'Primary Doctor' },
  { id: 'ec2', name: 'Dr. James Park', phone: '(555) 234-5678', relation: 'Geriatric Specialist' },
  { id: 'ec3', name: 'Dr. Maria Santos', phone: '(555) 345-6789', relation: 'Pediatrician' },
  { id: 'ec4', name: 'City Hospital ER', phone: '(555) 911-0000', relation: 'Emergency' },
  { id: 'ec5', name: 'Poison Control', phone: '1-800-222-1222', relation: 'Emergency' },
];

export const badges = [
  { id: 'b1', name: '7 Day Streak', icon: '🔥', earned: true, description: 'Took all medicines on time for 7 days' },
  { id: 'b2', name: '30 Day Champion', icon: '🏆', earned: true, description: 'Perfect adherence for 30 days' },
  { id: 'b3', name: 'Family Hero', icon: '👨‍👩‍👧', earned: true, description: 'Managed medications for entire family' },
  { id: 'b4', name: 'Early Bird', icon: '🌅', earned: true, description: 'Took morning meds before 7 AM for 14 days' },
  { id: 'b5', name: '100 Day Legend', icon: '💎', earned: false, description: 'Perfect adherence for 100 days' },
  { id: 'b6', name: 'Caregiver Pro', icon: '🩺', earned: false, description: 'Helped family members with 50+ doses' },
];

export const aiResponses: Record<string, string> = {
  'next dose': 'Your next dose is Vitamin D3 (1000 IU) at 8:00 AM for Sarah. That\'s in about 15 minutes!',
  'low stock': 'Here are medicines running low:\n• Lisinopril - 12 tablets remaining (~12 days)\n• Metformin - 28 tablets remaining (~14 days)\n\nWould you like to request a refill?',
  'adherence': 'Great news! Your family\'s adherence rate this week is 93%. Sarah has a perfect 30-day streak! 🎉',
  'default': 'I\'m your MediMate Assistant! I can help you with:\n• Medication schedules\n• Stock levels\n• Adherence reports\n• Safety information\n\nJust ask me anything!'
};
