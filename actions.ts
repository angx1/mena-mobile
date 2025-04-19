import { supabase } from "@/lib/supabase";

export const signInAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return {
      error: error.message,
      success: false,
    };
  }

  return {
    error: null,
    success: true,
  };
};

export const signOutAction = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return {
      error: error.message,
      success: false,
    };
  }
  return {
    error: null,
    success: true,
  };
};

export const signUpAction = async ({
  nombre,
  apellido,
  email,
  password,
}: {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}) => {
  try {
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }

    if (!nombre) {
      return {
        success: false,
        message: "Nombre is required",
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: nombre,
          apellidos: apellido,
        },
      },
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message:
        "Thanks for signing up! Please check your email for a verification link.",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred during sign up",
    };
  }
};
