import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  SettingsSeparator,
  LabeledToggle,
  InfoIconComponent as InfoIcon,
  RadioGroup,
  Label,
} from 'wix-rich-content-ui-components';
import { mergeStyles } from 'wix-rich-content-common';

import { MEMBER_ROLES, VISIBILITY } from '../../../defaults';
import styles from './poll-settings-section.scss';

export class PollSettingsSection extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });

  modalsWithEditorCommands = this.props.experiments.tiptapEditor?.enabled;

  useNewSettingsUi = !!this.props.experiments?.newSettingsModals?.enabled;

  VOTE_ROLE_OPTIONS = [
    {
      value: MEMBER_ROLES.SITE_MEMBERS,
      labelText: this.props.t(
        'Poll_PollSettings_Tab_Settings_Section_Voting_Permission_SiteMember'
      ),
    },
    {
      value: MEMBER_ROLES.ALL,
      labelText: this.props.t('Poll_PollSettings_Tab_Settings_Section_Voting_Permission_All'),
    },
  ];

  VIEW_ROLE_OPTIONS = [
    {
      value: VISIBILITY.ALWAYS,
      labelText: (
        <>
          {this.props.t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_All')}
          &nbsp;
          <InfoIcon
            tooltipText={this.props.t(
              'Poll_PollSettings_Tab_Settings_Section_Results_Permission_All_Tooltip'
            )}
          />
        </>
      ),
    },
    {
      value: VISIBILITY.VOTERS,
      labelText: (
        <>
          {this.props.t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_Voters')}
          &nbsp;
          <InfoIcon
            tooltipText={this.props.t(
              'Poll_PollSettings_Tab_Settings_Section_Results_Permission_Voters_Tooltip'
            )}
          />
        </>
      ),
    },
    {
      value: VISIBILITY.ME,
      labelText: (
        <>
          {this.props.t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_Owner')}
          &nbsp;
          <InfoIcon
            tooltipText={this.props.t(
              'Poll_PollSettings_Tab_Settings_Section_Results_Permission_Owner_Tooltip'
            )}
          />
        </>
      ),
    },
  ];

  updateSettings(settings) {
    const { updateData, componentData } = this.props;
    this.modalsWithEditorCommands
      ? updateData({
          poll: {
            ...componentData.poll,
            settings: { ...componentData.poll.settings, ...settings },
          },
        })
      : this.props.store.update('componentData', {
          poll: {
            settings,
          },
        });
  }

  render() {
    const { componentData, t, settings = {} } = this.props;

    const { votersDisplay, votesDisplay, multipleVotes, resultsVisibility, voteRole } =
      componentData.poll.settings;

    const { showVoteRoleSetting } = settings;

    return (
      <section className={this.useNewSettingsUi ? styles.section_newUi : styles.section}>
        <p className={styles.title}>{t('Poll_PollSettings_Tab_Settings_Section_Voting_Header')}</p>
        {showVoteRoleSetting && (
          <>
            <Label label={t('Poll_PollSettings_Tab_Settings_Section_Voting_Permission_Title')} />
            <RadioGroup
              name="voteRole"
              theme={this.styles}
              value={voteRole}
              onChange={voteRole => this.updateSettings({ voteRole })}
              dataSource={this.VOTE_ROLE_OPTIONS}
              className={styles.radioPanel}
            />
          </>
        )}

        <LabeledToggle
          label={t('Poll_PollSettings_Tab_Settings_Section_Voting_Multiselect')}
          checked={multipleVotes}
          onChange={() => this.updateSettings({ multipleVotes: !multipleVotes })}
          theme={this.styles}
        />

        <SettingsSeparator top bottom />

        <p className={styles.title}>{t('Poll_PollSettings_Tab_Settings_Section_Results_Header')}</p>

        <Label label={t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_Title')} />

        <RadioGroup
          name="resultsVisibility"
          theme={this.styles}
          value={resultsVisibility}
          onChange={resultsVisibility => this.updateSettings({ resultsVisibility })}
          dataSource={this.VIEW_ROLE_OPTIONS}
          className={styles.radioPanel}
        />

        {resultsVisibility !== VISIBILITY.ME && (
          <>
            <LabeledToggle
              label={t('Poll_PollSettings_Tab_Settings_Section_Results_VoteVisibility')}
              theme={this.styles}
              checked={votesDisplay}
              onChange={() =>
                this.updateSettings({
                  votesDisplay: !votesDisplay,
                  votersDisplay: !votesDisplay,
                })
              }
            />

            {votesDisplay && (
              <LabeledToggle
                label={t('Poll_PollSettings_Tab_Settings_Section_Results_VoterAnonymous')}
                theme={this.styles}
                checked={votersDisplay}
                onChange={() => this.updateSettings({ votersDisplay: !votersDisplay })}
              />
            )}
          </>
        )}
      </section>
    );
  }
}

PollSettingsSection.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
  experiments: PropTypes.object,
};
