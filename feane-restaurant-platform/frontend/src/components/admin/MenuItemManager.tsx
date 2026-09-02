// File: frontend/src/components/admin/MenuItemManager.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { Trash2, Pencil, X, Check } from 'lucide-react';
import { adminMenuApi } from '../../lib/adminMenu';
import type { MenuCategory, MenuItem } from '../../types/menu';

interface Props {
  items: MenuItem[];
  categories: MenuCategory[];
  onChange: () => void;
}

const EMPTY_FORM = { categoryId: '', name: '', description: '', price: '', imageUrl: '' };

function EditRow({
  item,
  categories,
  onDone,
}: {
  item: MenuItem;
  categories: MenuCategory[];
  onDone: () => void;
}) {
  const [form, setForm] = useState({
    categoryId: item.category_id,
    name: item.name,
    description: item.description ?? '',
    price: String(item.price),
    imageUrl: item.image_url ?? '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminMenuApi.updateItem(item.id, {
        categoryId: form.categoryId,
        name: form.name,
        description: form.description || undefined,
        price: Number(form.price),
        imageUrl: form.imageUrl || undefined,
      });
      onDone();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <tr className="border-t border-white/10 bg-white/[0.03]">
      <td colSpan={5} className="py-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
          <input
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Name"
            className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10"
          />
          <select
            value={form.categoryId}
            onChange={handleChange('categoryId')}
            className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-brand-dark">
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange('price')}
            placeholder="Price"
            className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10"
          />
          <input
            value={form.imageUrl}
            onChange={handleChange('imageUrl')}
            placeholder="/images/menu/example.jpg"
            className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 rounded-lg bg-brand-gold px-3 py-2 text-xs font-semibold text-brand-dark disabled:opacity-60"
            >
              <Check size={14} className="mx-auto" />
            </button>
            <button
              onClick={onDone}
              className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs text-white/70"
            >
              <X size={14} className="mx-auto" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export function MenuItemManager({ items, categories, onChange }: Props) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await adminMenuApi.createItem({
        categoryId: form.categoryId,
        name: form.name,
        description: form.description || undefined,
        price: Number(form.price),
        imageUrl: form.imageUrl || undefined,
      });
      setForm(EMPTY_FORM);
      onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add item');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleAvailability = async (item: MenuItem) => {
    await adminMenuApi.updateItem(item.id, { isAvailable: !item.is_available });
    onChange();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item? This fails if it appears in past orders — deactivate instead.')) return;
    try {
      await adminMenuApi.deleteItem(id);
      onChange();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not delete item');
    }
  };

  const finishEditing = () => {
    setEditingId(null);
    onChange();
  };

  return (
    <div className="mt-6 rounded-2xl bg-white/5 p-6">
      <h2 className="font-display text-xl text-white">Menu Items</h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-white/50">
            <tr>
              <th className="pb-2 font-normal">Name</th>
              <th className="pb-2 font-normal">Category</th>
              <th className="pb-2 font-normal">Price</th>
              <th className="pb-2 font-normal">Available</th>
              <th className="pb-2 font-normal" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) =>
              editingId === item.id ? (
                <EditRow key={item.id} item={item} categories={categories} onDone={finishEditing} />
              ) : (
                <tr key={item.id} className="border-t border-white/10">
                  <td className="py-2.5 text-white">{item.name}</td>
                  <td className="py-2.5 text-white/60">{item.category_name}</td>
                  <td className="py-2.5 text-brand-gold">${Number(item.price).toFixed(2)}</td>
                  <td className="py-2.5">
                    <button
                      onClick={() => toggleAvailability(item)}
                      className={`rounded-full px-3 py-1 text-xs ${
                        item.is_available ? 'bg-brand-gold/20 text-brand-gold' : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {item.is_available ? 'Available' : 'Unavailable'}
                    </button>
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setEditingId(item.id)} className="text-white/40 hover:text-brand-gold">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-white/40 hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleAdd} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <select
          required
          value={form.categoryId}
          onChange={handleChange('categoryId')}
          className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
        >
          <option value="" className="bg-brand-dark">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} className="bg-brand-dark">
              {cat.name}
            </option>
          ))}
        </select>
        <input
          required
          placeholder="Item name"
          value={form.name}
          onChange={handleChange('name')}
          className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
        />
        <input
          required
          type="number"
          step="0.01"
          min="0"
          placeholder="Price"
          value={form.price}
          onChange={handleChange('price')}
          className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
        />
        <input
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={handleChange('imageUrl')}
          className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
        />
        <input
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange('description')}
          className="sm:col-span-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
        />
        <button
          type="submit"
          disabled={submitting}
          className="sm:col-span-2 rounded-lg bg-brand-gold py-2.5 text-sm font-semibold text-brand-dark hover:brightness-110 disabled:opacity-60"
        >
          Add Item
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}