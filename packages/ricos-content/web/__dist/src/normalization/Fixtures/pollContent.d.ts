declare const _default: {
    config: {
        size: string;
        width: string;
        textWrap: string;
        alignment: string;
        enableVoteRole: boolean;
    };
    poll: {
        id: string;
        title: string;
        mediaId: string;
        createdBy: string;
        count: number;
        anonymousCount: number;
        ownVotes: string[];
        settings: {
            multipleVotes: boolean;
            voteRole: string;
            resultsVisibility: string;
            votersDisplay: boolean;
            votesDisplay: boolean;
        };
        options: {
            id: string;
            title: string;
            mediaId: string;
            count: number;
            anonymousCount: number;
            rating: number;
            latestVoters: string[];
        }[];
        creatorFlag: boolean;
    };
    design: {
        poll: {
            background: string;
            borderRadius: number;
            backgroundType: string;
        };
        option: {
            borderRadius: number;
        };
    };
    layout: {
        poll: {
            type: string;
            direction: string;
            enableImage: boolean;
        };
        option: {
            enableImage: boolean;
        };
    };
};
export default _default;
//# sourceMappingURL=pollContent.d.ts.map