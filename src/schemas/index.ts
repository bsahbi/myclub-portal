import { z } from 'zod';

export const InquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(8, { message: 'Please provide a valid phone number' }),
  discipline: z.string().min(1, { message: 'Please select a martial art' }),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  preferredTime: z.enum(['morning', 'evening', 'weekend']),
  notes: z.string().max(500, { message: 'Notes cannot exceed 500 characters' }).optional(),
});

export type InquiryFormValues = z.infer<typeof InquirySchema>;

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const AdSenseConfigSchema = z.object({
  clientCode: z.string().regex(/^ca-pub-\d{16}$/, {
    message: 'Must be in format ca-pub-XXXXXXXXXXXXXXXX (16 digits)',
  }).or(z.literal('')),
  leaderboardSlot: z.string().optional(),
  sidebarSlot: z.string().optional(),
  inFeedSlot: z.string().optional(),
  enabled: z.boolean(),
  showTestBanners: z.boolean(),
});

export type AdSenseConfigValues = z.infer<typeof AdSenseConfigSchema>;

export const ClubSubmitSchema = z.object({
  name: z.string().min(3, { message: 'Club name must be at least 3 characters' }),
  city: z.string().min(2, { message: 'City is required' }),
  country: z.string().min(2, { message: 'Country is required' }),
  discipline: z.string().min(1, { message: 'Primary martial art required' }),
  phone: z.string().min(8, { message: 'Contact phone required' }),
  email: z.string().email({ message: 'Valid club email required' }),
  videoUrl: z.string().url({ message: 'Please provide a valid promotional video URL' }).optional().or(z.literal('')),
  description: z.string().min(20, { message: 'Please provide at least 20 characters of description' }),
});

export type ClubSubmitValues = z.infer<typeof ClubSubmitSchema>;
