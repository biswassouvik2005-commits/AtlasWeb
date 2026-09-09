import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured, INITIAL_PROJECT_UPDATES } from '../lib/supabase';
import { WaitlistRecord, ProjectUpdate } from '../types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  waitlistEntry: WaitlistRecord | null;
  updates: ProjectUpdate[];
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password?: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password?: string, fullName?: string, organization?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  submitWaitlist: (data: Partial<WaitlistRecord>) => Promise<{ error: Error | null; data?: WaitlistRecord }>;
  refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'odyssey_local_user';
const LOCAL_STORAGE_WAITLIST_KEY = 'odyssey_local_waitlist';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [waitlistEntry, setWaitlistEntry] = useState<WaitlistRecord | null>(null);
  const [updates, setUpdates] = useState<ProjectUpdate[]>(INITIAL_PROJECT_UPDATES);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isConfigured = isSupabaseConfigured();

  // Load user & waitlist records
  const loadUserData = async (currentUser: User | null) => {
    if (!currentUser) {
      setWaitlistEntry(null);
      return;
    }

    const client = getSupabase();
    if (client && isConfigured) {
      try {
        // Query waitlist entry for this authenticated user
        const { data, error } = await client
          .from('waitlist')
          .select('*')
          .or(`user_id.eq.${currentUser.id},email.eq.${currentUser.email}`)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (data && !error) {
          setWaitlistEntry(data as WaitlistRecord);
        } else {
          setWaitlistEntry(null);
        }

        // Query any dynamic project updates
        const { data: updatesData, error: updatesError } = await client
          .from('project_updates')
          .select('*')
          .order('is_pinned', { ascending: false })
          .order('published_at', { ascending: false });

        if (updatesData && !updatesError && updatesData.length > 0) {
          setUpdates(updatesData as ProjectUpdate[]);
        }
      } catch (err) {
        console.warn('Error fetching Supabase data:', err);
      }
    } else {
      // Local storage fallback for seamless testing
      const cachedWaitlist = localStorage.getItem(LOCAL_STORAGE_WAITLIST_KEY);
      if (cachedWaitlist) {
        try {
          const parsed = JSON.parse(cachedWaitlist);
          if (parsed.email === currentUser.email) {
            setWaitlistEntry(parsed);
          }
        } catch {
          // ignore
        }
      }
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      const client = getSupabase();

      if (client && isConfigured) {
        try {
          const { data } = await client.auth.getSession();
          setSession(data.session);
          setUser(data.session?.user ?? null);
          await loadUserData(data.session?.user ?? null);

          // Subscribe to auth state changes
          const { data: listener } = client.auth.onAuthStateChange(async (_event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
            await loadUserData(newSession?.user ?? null);
          });

          setIsLoading(false);
          return () => {
            listener.subscription.unsubscribe();
          };
        } catch (err) {
          console.warn('Supabase auth initialization warning:', err);
          setIsLoading(false);
        }
      } else {
        // Local preview fallback
        const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser) as User;
            setUser(parsedUser);
            await loadUserData(parsedUser);
          } catch {
            localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
          }
        }
        setIsLoading(false);
      }
    };

    initAuth();
  }, [isConfigured]);

  const signIn = async (email: string, password?: string): Promise<{ error: Error | null }> => {
    setIsLoading(true);
    const client = getSupabase();

    if (client && isConfigured && password) {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setIsLoading(false);
        return { error };
      }
      setSession(data.session);
      setUser(data.user);
      await loadUserData(data.user);
      setIsLoading(false);
      return { error: null };
    }

    // Local simulated auth when Supabase credentials are not yet connected
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      app_metadata: { provider: 'email' },
      user_metadata: { full_name: email.split('@')[0] },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      email,
    };
    setUser(mockUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(mockUser));
    await loadUserData(mockUser);
    setIsLoading(false);
    return { error: null };
  };

  const signUp = async (
    email: string,
    password?: string,
    fullName?: string,
    organization?: string
  ): Promise<{ error: Error | null }> => {
    setIsLoading(true);
    const client = getSupabase();

    if (client && isConfigured && password) {
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            organization,
          },
        },
      });
      if (error) {
        setIsLoading(false);
        return { error };
      }
      setSession(data.session);
      setUser(data.user);
      await loadUserData(data.user);
      setIsLoading(false);
      return { error: null };
    }

    // Local fallback creation
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      app_metadata: { provider: 'email' },
      user_metadata: { full_name: fullName || email.split('@')[0], organization },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      email,
    };
    setUser(mockUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(mockUser));
    await loadUserData(mockUser);
    setIsLoading(false);
    return { error: null };
  };

  const signOut = async () => {
    setIsLoading(true);
    const client = getSupabase();
    if (client && isConfigured) {
      await client.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setWaitlistEntry(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    setIsLoading(false);
  };

  const submitWaitlist = async (
    data: Partial<WaitlistRecord>
  ): Promise<{ error: Error | null; data?: WaitlistRecord }> => {
    const userEmail = data.email || user?.email;
    if (!userEmail) {
      return { error: new Error('An email address is required.') };
    }

    const record: WaitlistRecord = {
      email: userEmail,
      user_id: user?.id,
      full_name: data.full_name || (user?.user_metadata?.full_name as string) || userEmail.split('@')[0],
      organization: data.organization || (user?.user_metadata?.organization as string) || 'Independent Researcher',
      role: data.role || 'ML Engineer / Student',
      intended_use: data.intended_use || 'Evaluating Atlas 0.1 CP unaligned logic density and test-time scaling.',
      delivery_channel: data.delivery_channel || 'all',
      preferred_hardware: data.preferred_hardware || 'NVIDIA GPU / Apple Silicon',
      status: 'reviewing',
      position: waitlistEntry?.position || Math.floor(Math.random() * 80) + 140,
      created_at: waitlistEntry?.created_at || new Date().toISOString(),
    };

    const client = getSupabase();
    if (client && isConfigured) {
      try {
        const { data: upsertData, error } = await client
          .from('waitlist')
          .upsert(record, { onConflict: 'email' })
          .select()
          .single();

        if (error) {
          console.warn('Supabase waitlist upsert error:', error);
          // Fall back gracefully to local state
          setWaitlistEntry(record);
          localStorage.setItem(LOCAL_STORAGE_WAITLIST_KEY, JSON.stringify(record));
          return { error: null, data: record };
        }

        const savedRecord = upsertData as WaitlistRecord;
        setWaitlistEntry(savedRecord);
        return { error: null, data: savedRecord };
      } catch (err) {
        console.warn('Supabase waitlist error, storing locally:', err);
        setWaitlistEntry(record);
        localStorage.setItem(LOCAL_STORAGE_WAITLIST_KEY, JSON.stringify(record));
        return { error: null, data: record };
      }
    }

    // Local mode
    setWaitlistEntry(record);
    localStorage.setItem(LOCAL_STORAGE_WAITLIST_KEY, JSON.stringify(record));
    return { error: null, data: record };
  };

  const refreshData = async () => {
    await loadUserData(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        waitlistEntry,
        updates,
        isLoading,
        isConfigured,
        signIn,
        signUp,
        signOut,
        submitWaitlist,
        refreshData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
