import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  option1 = false;
  option2 = false;
  option3 = false;
  checkbox1 = false;
  checkbox2 = false;
  checkbox3 = false;
  selectedRadio = '';
  sliderValue = 50; // Default value for slider

  constructor() {}

  async ngOnInit() {
    await this.loadPreferences();
  }

  async loadPreferences() {
    this.option1 = (await this.getPreference('option1')) === 'true';
    this.option2 = (await this.getPreference('option2')) === 'true';
    this.option3 = (await this.getPreference('option3')) === 'true';

    this.checkbox1 = (await this.getPreference('checkbox1')) === 'true';
    this.checkbox2 = (await this.getPreference('checkbox2')) === 'true';
    this.checkbox3 = (await this.getPreference('checkbox3')) === 'true';

    this.selectedRadio = (await this.getPreference('selectedRadio')) || '';
    this.sliderValue = parseInt((await this.getPreference('sliderValue')) || '50', 10);
  }

  async savePreference(key: string, value: any) {
    await Preferences.set({
      key: key,
      value: value.toString(),
    });
  }

  async getPreference(key: string) {
    const { value } = await Preferences.get({ key: key });
    return value;
  }

  async resetSettings() {
    await Preferences.clear(); // Clear all stored settings

    // Reset UI values
    this.option1 = false;
    this.option2 = false;
    this.option3 = false;
    this.checkbox1 = false;
    this.checkbox2 = false;
    this.checkbox3 = false;
    this.selectedRadio = '';
    this.sliderValue = 50;
  }
}
