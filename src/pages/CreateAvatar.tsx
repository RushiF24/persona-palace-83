import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, PERSONALITY_TRAITS, APPEARANCE_OPTIONS } from "@/types/avatar";
import { ArrowLeft, Sparkles, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CreateAvatar() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [avatarData, setAvatarData] = useState({
    name: "",
    appearance: {
      gender: "" as any,
      age: "",
      hair: "",
      clothing: "",
      description: "",
    },
    personalityTraits: [] as string[],
  });

  const handleTraitToggle = (trait: string) => {
    setAvatarData(prev => ({
      ...prev,
      personalityTraits: prev.personalityTraits.includes(trait)
        ? prev.personalityTraits.filter(t => t !== trait)
        : [...prev.personalityTraits, trait]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarData.name || !avatarData.appearance.gender || avatarData.personalityTraits.length === 0) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically save to your backend
    console.log("Creating avatar:", avatarData);
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  const isValid = avatarData.name && avatarData.appearance.gender && avatarData.personalityTraits.length > 0;

  return (
    <Layout showSidebar={false}>
      {/* Header */}
      <div className="border-b border-border p-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create Avatar</h1>
            <p className="text-muted-foreground">Design your unique AI companion</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Avatar Name *</Label>
                  <Input
                    id="name"
                    value={avatarData.name}
                    onChange={(e) => setAvatarData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter a name for your avatar..."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={avatarData.appearance.description}
                    onChange={(e) => setAvatarData(prev => ({
                      ...prev,
                      appearance: { ...prev.appearance, description: e.target.value }
                    }))}
                    placeholder="Describe your avatar's background, role, or any special details..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Gender *</Label>
                    <Select
                      value={avatarData.appearance.gender}
                      onValueChange={(value: any) => 
                        setAvatarData(prev => ({ 
                          ...prev, 
                          appearance: { ...prev.appearance, gender: value } 
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {APPEARANCE_OPTIONS.gender.map(option => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Age Range</Label>
                    <Select
                      value={avatarData.appearance.age}
                      onValueChange={(value) => 
                        setAvatarData(prev => ({ 
                          ...prev, 
                          appearance: { ...prev.appearance, age: value } 
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        {APPEARANCE_OPTIONS.age.map(option => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Hair Color</Label>
                    <Select
                      value={avatarData.appearance.hair}
                      onValueChange={(value) => 
                        setAvatarData(prev => ({ 
                          ...prev, 
                          appearance: { ...prev.appearance, hair: value } 
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select hair color" />
                      </SelectTrigger>
                      <SelectContent>
                        {APPEARANCE_OPTIONS.hair.map(option => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Clothing Style</Label>
                    <Select
                      value={avatarData.appearance.clothing}
                      onValueChange={(value) => 
                        setAvatarData(prev => ({ 
                          ...prev, 
                          appearance: { ...prev.appearance, clothing: value } 
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select clothing style" />
                      </SelectTrigger>
                      <SelectContent>
                        {APPEARANCE_OPTIONS.clothing.map(option => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personality Traits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Personality Traits *
                  <Badge variant="secondary">
                    {avatarData.personalityTraits.length} selected
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select traits that define your avatar's personality (choose at least 1)
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {PERSONALITY_TRAITS.map((trait) => (
                    <div
                      key={trait}
                      className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => handleTraitToggle(trait)}
                    >
                      <Checkbox
                        id={trait}
                        checked={avatarData.personalityTraits.includes(trait)}
                        onChange={() => handleTraitToggle(trait)}
                      />
                      <Label htmlFor={trait} className="text-sm cursor-pointer">
                        {trait.charAt(0).toUpperCase() + trait.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!isValid || isLoading}
                variant="gradient"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Avatar
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}