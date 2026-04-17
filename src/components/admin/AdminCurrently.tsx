import { useState, useEffect } from 'react'
import { Save, Loader2, Check, LayoutGrid, MapPin, Plus, X } from 'lucide-react'
import { getJsonFile, updateJsonFile } from '@/lib/github'

interface CurrentlyCard {
  title: string
  description: string
  link?: string | null
  image?: string
  bookshopUrl?: string
}

interface LocationData {
  city: string
  status: string
  image?: string
  upcoming: { city: string; dates: string }[]
}

interface CurrentlyData {
  building: CurrentlyCard
  projects: CurrentlyCard
  design: CurrentlyCard
  watching: { note: string }
  reading: CurrentlyCard & { author: string }
  location: LocationData
  latestApp: unknown
}

const CURRENTLY_PATH = 'src/content/currently.json'

export default function AdminCurrently() {
  const [data, setData] = useState<CurrentlyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Load current data on mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const { data: currentData } = await getJsonFile<CurrentlyData>(CURRENTLY_PATH)
      setData(currentData)
    } catch (error) {
      console.error('Failed to load currently data:', error)
      setMessage({ type: 'error', text: 'Failed to load data from GitHub' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!data) return

    setIsSaving(true)
    
    try {
      const { sha: freshSha } = await getJsonFile<CurrentlyData>(CURRENTLY_PATH)
      
      await updateJsonFile(
        CURRENTLY_PATH,
        data,
        'Update Currently section',
        freshSha
      )

      setMessage({ type: 'success', text: 'Currently section updated!' })
      loadData()
    } catch (error) {
      console.error('Failed to save:', error)
      setMessage({ type: 'error', text: 'Failed to save to GitHub' })
    } finally {
      setIsSaving(false)
    }
  }

  const updateCard = (key: keyof CurrentlyData, field: string, value: string) => {
    if (!data) return
    setData({
      ...data,
      [key]: {
        ...data[key] as object,
        [field]: value,
      },
    })
  }

  const updateLocation = (field: keyof LocationData, value: string | { city: string; dates: string }[]) => {
    if (!data) return
    setData({
      ...data,
      location: {
        ...data.location,
        [field]: value,
      },
    })
  }

  const addUpcoming = () => {
    if (!data) return
    setData({
      ...data,
      location: {
        ...data.location,
        upcoming: [...data.location.upcoming, { city: '', dates: '' }],
      },
    })
  }

  const removeUpcoming = (index: number) => {
    if (!data) return
    const updated = [...data.location.upcoming]
    updated.splice(index, 1)
    setData({
      ...data,
      location: {
        ...data.location,
        upcoming: updated,
      },
    })
  }

  const updateUpcoming = (index: number, field: 'city' | 'dates', value: string) => {
    if (!data) return
    const updated = [...data.location.upcoming]
    updated[index] = { ...updated[index], [field]: value }
    setData({
      ...data,
      location: {
        ...data.location,
        upcoming: updated,
      },
    })
  }

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-text-muted" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-16">
        <p className="text-text-muted">Failed to load data</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Message Toast */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-500/10 text-green-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          {message.type === 'success' ? <Check className="w-5 h-5" /> : null}
          <span className="font-body text-body-sm">{message.text}</span>
        </div>
      )}

      {/* Save Button - Sticky */}
      <div className="flex justify-end sticky top-20 z-10">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-warm/20 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          Save Changes
        </button>
      </div>

      {/* Building */}
      <CardEditor
        label="Building"
        icon={<LayoutGrid className="w-5 h-5 text-accent-warm" />}
        title={data.building.title}
        description={data.building.description}
        link={data.building.link || ''}
        image={data.building.image || ''}
        onTitleChange={(v) => updateCard('building', 'title', v)}
        onDescriptionChange={(v) => updateCard('building', 'description', v)}
        onLinkChange={(v) => updateCard('building', 'link', v)}
        onImageChange={(v) => updateCard('building', 'image', v)}
      />

      {/* Projects */}
      <CardEditor
        label="Projects"
        title={data.projects.title}
        description={data.projects.description}
        link={data.projects.link || ''}
        image={data.projects.image || ''}
        onTitleChange={(v) => updateCard('projects', 'title', v)}
        onDescriptionChange={(v) => updateCard('projects', 'description', v)}
        onLinkChange={(v) => updateCard('projects', 'link', v)}
        onImageChange={(v) => updateCard('projects', 'image', v)}
      />

      {/* Design */}
      <CardEditor
        label="Design"
        title={data.design.title}
        description={data.design.description}
        link={data.design.link || ''}
        image={data.design.image || ''}
        onTitleChange={(v) => updateCard('design', 'title', v)}
        onDescriptionChange={(v) => updateCard('design', 'description', v)}
        onLinkChange={(v) => updateCard('design', 'link', v)}
        onImageChange={(v) => updateCard('design', 'image', v)}
      />

      {/* Reading - Note about auto-population */}
      <div className="bg-surface-raised rounded-xl p-6">
        <h3 className="font-display text-body-lg mb-2">Reading</h3>
        <p className="font-body text-body-sm text-text-muted">
          The Reading card auto-populates from your most recent book in the Books tab. 
          Add books there to update what's shown on the homepage.
        </p>
      </div>

      {/* Location */}
      <div className="bg-surface-raised rounded-xl p-6">
        <h3 className="font-display text-body-lg mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent-warm" />
          Working From
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-body text-body-sm text-text-muted mb-1">City</label>
            <input
              type="text"
              value={data.location.city}
              onChange={(e) => updateLocation('city', e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text focus:outline-none focus:border-accent-warm transition-colors"
            />
          </div>
          <div>
            <label className="block font-body text-body-sm text-text-muted mb-1">Status</label>
            <input
              type="text"
              value={data.location.status}
              onChange={(e) => updateLocation('status', e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text focus:outline-none focus:border-accent-warm transition-colors"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-body text-body-sm text-text-muted mb-1">Image Path</label>
            <input
              type="text"
              value={data.location.image || ''}
              onChange={(e) => updateLocation('image', e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text focus:outline-none focus:border-accent-warm transition-colors"
            />
          </div>
        </div>

        {/* Upcoming */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-body text-body-sm text-text-muted">Upcoming Travel</label>
            <button
              onClick={addUpcoming}
              className="text-accent-warm hover:text-accent-glow transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {data.location.upcoming.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item.city}
                  onChange={(e) => updateUpcoming(index, 'city', e.target.value)}
                  placeholder="City/Cities"
                  className="flex-1 px-3 py-2 bg-surface border border-surface-subtle rounded-lg font-body text-body-sm text-text placeholder:text-text-subtle focus:outline-none focus:border-accent-warm transition-colors"
                />
                <input
                  type="text"
                  value={item.dates}
                  onChange={(e) => updateUpcoming(index, 'dates', e.target.value)}
                  placeholder="Dates (optional)"
                  className="w-32 px-3 py-2 bg-surface border border-surface-subtle rounded-lg font-body text-body-sm text-text placeholder:text-text-subtle focus:outline-none focus:border-accent-warm transition-colors"
                />
                <button
                  onClick={() => removeUpcoming(index)}
                  className="p-2 text-text-subtle hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable card editor component
function CardEditor({
  label,
  icon,
  title,
  description,
  link,
  image,
  onTitleChange,
  onDescriptionChange,
  onLinkChange,
  onImageChange,
}: {
  label: string
  icon?: React.ReactNode
  title: string
  description: string
  link: string
  image: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onLinkChange: (value: string) => void
  onImageChange: (value: string) => void
}) {
  return (
    <div className="bg-surface-raised rounded-xl p-6">
      <h3 className="font-display text-body-lg mb-4 flex items-center gap-2">
        {icon}
        {label}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-body-sm text-text-muted mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full px-4 py-2 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text focus:outline-none focus:border-accent-warm transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-body-sm text-text-muted mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full px-4 py-2 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text focus:outline-none focus:border-accent-warm transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-body-sm text-text-muted mb-1">Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => onLinkChange(e.target.value)}
            placeholder="/writing/slug or https://..."
            className="w-full px-4 py-2 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text placeholder:text-text-subtle focus:outline-none focus:border-accent-warm transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-body-sm text-text-muted mb-1">Image Path</label>
          <input
            type="text"
            value={image}
            onChange={(e) => onImageChange(e.target.value)}
            placeholder="/images/currently/..."
            className="w-full px-4 py-2 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text placeholder:text-text-subtle focus:outline-none focus:border-accent-warm transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
