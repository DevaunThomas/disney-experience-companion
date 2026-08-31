"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { attractions } from "@/data/attractions";

type Profile = {
  name: string;
  avatar: string;
  preferredPark: string;
  visitPace: string;
  notifications: boolean;
  favorites: number[];
};

const createInitialProfile = (name: string, avatar: string): Profile => ({
  name,
  avatar,
  preferredPark: "No preference",
  visitPace: "Balanced",
  notifications: true,
  favorites: [],
});

export default function ProfileEditor({
  accountId,
  initialName,
  initialAvatar,
}: {
  accountId: string;
  initialName: string;
  initialAvatar: string;
}) {
  const storageKey = `disney-profile:${accountId}`;
  const [profile, setProfile] = useState(() => createInitialProfile(initialName, initialAvatar));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        const savedProfile = JSON.parse(stored) as Profile;
        const timeout = window.setTimeout(() => setProfile(savedProfile), 0);
        return () => window.clearTimeout(timeout);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
  }, [storageKey]);

  const updateAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 1_500_000) {
      window.alert("Please choose an image smaller than 1.5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setProfile((current) => ({ ...current, avatar: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const toggleFavorite = (id: number) => {
    setProfile((current) => ({
      ...current,
      favorites: current.favorites.includes(id)
        ? current.favorites.filter((favoriteId) => favoriteId !== id)
        : [...current.favorites, id],
    }));
  };

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.setItem(storageKey, JSON.stringify(profile));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={saveProfile} className="grid gap-6 lg:grid-cols-[1fr_1.25fr]">
      <div className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Personal details</h2>
          <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="relative size-24 overflow-hidden rounded-full bg-blue-100">
              {profile.avatar ? (
                <Image src={profile.avatar} alt="Profile avatar" fill sizes="96px" className="object-cover" unoptimized />
              ) : (
                <span className="flex size-full items-center justify-center text-3xl font-bold text-blue-800">
                  {profile.name.trim().charAt(0).toUpperCase() || "?"}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="avatar" className="inline-block cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50">
                Change avatar
              </label>
              <input id="avatar" type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={updateAvatar} />
              <p className="mt-2 text-xs text-slate-500">PNG, JPG, or WebP up to 1.5 MB.</p>
            </div>
          </div>
          <label htmlFor="profile-name" className="mt-5 block text-sm font-semibold">Name</label>
          <input
            id="profile-name"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            value={profile.name}
            required
            onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
          />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Preferences</h2>
          <label htmlFor="preferred-park" className="mt-4 block text-sm font-semibold">Preferred park</label>
          <select
            id="preferred-park"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={profile.preferredPark}
            onChange={(event) => setProfile((current) => ({ ...current, preferredPark: event.target.value }))}
          >
            <option>No preference</option>
            <option>Disneyland</option>
            <option>Disney&apos;s California Adventure</option>
          </select>
          <label htmlFor="visit-pace" className="mt-4 block text-sm font-semibold">Visit pace</label>
          <select
            id="visit-pace"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
            value={profile.visitPace}
            onChange={(event) => setProfile((current) => ({ ...current, visitPace: event.target.value }))}
          >
            <option>Relaxed</option>
            <option>Balanced</option>
            <option>See everything</option>
          </select>
          <label className="mt-5 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-0.5 size-4 accent-blue-700"
              checked={profile.notifications}
              onChange={(event) => setProfile((current) => ({ ...current, notifications: event.target.checked }))}
            />
            <span><strong className="block">Trip notifications</strong>Receive helpful reminders about your saved plans.</span>
          </label>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Favorite attractions</h2>
        <p className="mt-1 text-sm text-slate-600">Choose attractions to keep close while planning your day.</p>
        <div className="mt-4 max-h-[38rem] space-y-2 overflow-y-auto pr-2">
          {attractions.map((attraction) => (
            <label key={attraction.id} className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
              <input
                type="checkbox"
                className="mt-1 size-4 shrink-0 accent-blue-700"
                checked={profile.favorites.includes(attraction.id)}
                onChange={() => toggleFavorite(attraction.id)}
              />
              <span>
                <strong className="block text-sm">{attraction.name}</strong>
                <span className="text-xs text-slate-500">{attraction.park} · {attraction.land}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-3 lg:col-span-2">
        <button type="submit" className="rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800">Save profile</button>
        <p className="text-sm font-medium text-green-700" role="status">{saved ? "Your changes have been saved." : ""}</p>
      </div>
    </form>
  );
}
